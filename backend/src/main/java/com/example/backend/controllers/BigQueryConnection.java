package com.example.backend.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.StringJoiner;
import java.util.UUID;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.bigquery.BigQuery;
import com.google.cloud.bigquery.BigQueryOptions;
import com.google.cloud.bigquery.Dataset;
import com.google.cloud.bigquery.FieldValueList;
import com.google.cloud.bigquery.Job;
import com.google.cloud.bigquery.JobId;
import com.google.cloud.bigquery.JobInfo;
import com.google.cloud.bigquery.QueryJobConfiguration;
import com.google.cloud.bigquery.TableResult;

@RestController
public class BigQueryConnection {
    BigQuery privateBigQuery;
    BigQuery publicBigQuery;

    public BigQueryConnection() throws IOException {
        // TODO(developer): Replace these variables before running the sample.
        String projectId = "profitable-infra-consumption";
        File credentialsPath = new File("C:\\Users\\fwintz\\Downloads\\profitable-infra-consumption-c781e9bccc56.json");
        // File credentialsPath = new File("C:/Users/fwintz/Downloads/profitable-infra-consumption-c781e9bccc56.json");

        // Load credentials from JSON key file. If you can't set the GOOGLE_APPLICATION_CREDENTIALS
        // environment variable, you can explicitly load the credentials file to construct the
        // credentials.
        GoogleCredentials credentials;
        try (FileInputStream serviceAccountStream = new FileInputStream(credentialsPath)) {
            credentials = ServiceAccountCredentials.fromStream(serviceAccountStream);
        }

        // Instantiate a client.
        privateBigQuery =
            BigQueryOptions.newBuilder()
                .setCredentials(credentials)
                .setProjectId(projectId)
                .build()
                .getService();

        // Use the client.
        System.out.println("Datasets:");
        for (Dataset dataset : privateBigQuery.listDatasets().iterateAll()) {
            System.out.printf("%s%n", dataset.getDatasetId().getDataset());
        }

        // instantiate public client
        publicBigQuery = BigQueryOptions.getDefaultInstance().getService();
    }

    public String getJSONFromQuery(String query,String queryString) throws Exception {
        QueryJobConfiguration queryConfig =
            QueryJobConfiguration.newBuilder(query)
            // Use standard SQL syntax for queries.
            // See: https://cloud.google.com/bigquery/sql-reference/
            .setUseLegacySql(false)
            .build();
            
        // Create a job ID so that we can safely retry.
        JobId jobId = JobId.of(UUID.randomUUID().toString());
        Job queryJob;
        if (queryString.equals("public")) {
            queryJob = publicBigQuery.create(JobInfo.newBuilder(queryConfig).setJobId(jobId).build());
        } else {
            queryJob = privateBigQuery.create(JobInfo.newBuilder(queryConfig).setJobId(jobId).build());
        }
        
    
        // Wait for the query to complete.
        queryJob = queryJob.waitFor();
    
        // Check for errors
        if (queryJob == null) {
          throw new RuntimeException("Job no longer exists");
        } else if (queryJob.getStatus().getError() != null) {
          // You can also look at queryJob.getStatus().getExecutionErrors() for all
          // errors, not just the latest one.
          throw new RuntimeException(queryJob.getStatus().getError().toString());
        }
    
        // Get the results.
        TableResult result = queryJob.getQueryResults();
        
        // Print all pages of the results.
        Iterable<FieldValueList> iterable = result.iterateAll();
        
        List<String> output = new ArrayList<String>();
        StringJoiner strJoin = new StringJoiner(",");
        // iterable.forEach(output::add);
        iterable.forEach(s-> {
            output.add(s.get("json").getStringValue());
            strJoin.add(s.get("json").getStringValue());
        });
        
        // // Print all pages of the results.
        // for (FieldValueList row : result.iterateAll()) {
        //   // String type
        //   String url = row.get("url").getStringValue();
        //   String viewCount = row.get("view_count").getStringValue();
        //   System.out.printf("%s : %s views\n", url, viewCount);
        // }
        // return result;
        // for (FieldValueList row : result.iterateAll()) {
        //     return row.get("json").getStringValue();
        // }
        return "[" + strJoin.toString() + "]";
    }

    @GetMapping("/GET/public-data")
    public String getPublicData() throws Exception {
        // QueryJobConfiguration queryConfig =
        //     QueryJobConfiguration.newBuilder(
        //             "SELECT CONCAT('https://stackoverflow.com/questions/', "
        //                 + "CAST(id as STRING)) as url, view_count "
        //                 + "FROM `bigquery-public-data.stackoverflow.posts_questions` "
        //                 + "WHERE tags like '%google-bigquery%' "
        //                 + "ORDER BY view_count DESC "
        //                 + "LIMIT 10")
        //     // Use standard SQL syntax for queries.
        //     // See: https://cloud.google.com/bigquery/sql-reference/
        //     .setUseLegacySql(false)
        //     .build();
        // String query = ("SELECT * FROM `ctg-storage.bigquery_billing_export.gcp_billing_export_v1_01150A_B8F62B_47D999` " +
        //                 "WHERE DATE(_PARTITIONTIME) = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) " + 
        //                 "LIMIT 100");
        String newQuery = (
                        "WITH MyTable AS (SELECT * FROM `ctg-storage.bigquery_billing_export.gcp_billing_export_v1_01150A_B8F62B_47D999` " +
                        "WHERE DATE(_PARTITIONTIME) = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) " + 
                        "LIMIT 100) " +
                        "SELECT TO_JSON_STRING(t) AS json " +
                        "FROM MyTable AS t");
        return getJSONFromQuery(newQuery,"public");
    }

    @GetMapping("/GET/private-data")
    public String getPrivateData() throws Exception {
        // QueryJobConfiguration queryConfig =
        //     QueryJobConfiguration.newBuilder(
        //             "SELECT CONCAT('https://stackoverflow.com/questions/', "
        //                 + "CAST(id as STRING)) as url, view_count "
        //                 + "FROM `bigquery-public-data.stackoverflow.posts_questions` "
        //                 + "WHERE tags like '%google-bigquery%' "
        //                 + "ORDER BY view_count DESC "
        //                 + "LIMIT 10")
        //     // Use standard SQL syntax for queries.
        //     // See: https://cloud.google.com/bigquery/sql-reference/
        //     .setUseLegacySql(false)
        //     .build();
        String query = ("SELECT * FROM `profitable-infra-consumption.all_billing_data.gcp_billing_export_v1_0124FF_8C7296_9F0D41` " +
                        "WHERE DATE(_PARTITIONTIME) = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) " + 
                        "LIMIT 100");
        return getJSONFromQuery(query,"private");
    }

    @GetMapping("/POST")
    public String getHelloWorld() {
        return "Hello World!";
    }
    
}
