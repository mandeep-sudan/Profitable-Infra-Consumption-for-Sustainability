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

/*
HELPFUL LINKS:
    (1) Query a public dataset with BigQuery client libraries
        https://cloud.google.com/bigquery/docs/quickstarts/quickstart-client-libraries

    (2) Authenticating with a service account key file for BigQuery
        https://cloud.google.com/bigquery/docs/authentication/service-account-file

    (3) Convert BigQuery output easily to JSON
        https://stackoverflow.com/questions/44150064/how-to-get-query-result-in-json-form-using-java-api-of-google-bigquery
*/ 

@RestController
public class BigQueryConnection {
    // fields
    BigQuery privateBigQuery;
    BigQuery publicBigQuery;

    // ****************************************************************
    // ********************** CONSTRUCTOR(S) **************************
    // ****************************************************************

    // Constructor to instantiate public and private bigquery instances for later use
    public BigQueryConnection() throws IOException {
        // (1) INSTANTIATE PRIVATE CLIENT
        // https://cloud.google.com/bigquery/docs/authentication/service-account-file

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

        // (1) INSTANTIATE PUBLIC CLIENT
        publicBigQuery = BigQueryOptions.getDefaultInstance().getService();
    }




    // ****************************************************************
    // ******************** HELPER FUNCTION(S) ************************
    // ****************************************************************
    
    // helper function to get JSON string from a given query
    public String getJSONFromQuery(String oldQuery, String publicOrPrivate) throws Exception {
        // modify query to make json configuration easier
        // https://stackoverflow.com/questions/44150064/how-to-get-query-result-in-json-form-using-java-api-of-google-bigquery
        String query = "WITH MyTable AS (" + oldQuery +
                            ") SELECT TO_JSON_STRING(t) AS json " +
                            "FROM MyTable AS t";

        // create query job configuration based on input
        // https://cloud.google.com/bigquery/docs/quickstarts/quickstart-client-libraries
        QueryJobConfiguration queryConfig =
            QueryJobConfiguration.newBuilder(query)
            // Use standard SQL syntax for queries.
            // See: https://cloud.google.com/bigquery/sql-reference/
            .setUseLegacySql(false)
            .build();
            
        // Create a job ID so that we can safely retry.
        JobId jobId = JobId.of(UUID.randomUUID().toString());
        Job queryJob;
        if (publicOrPrivate.equals("public")) {
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
        
        // transform TableResult into Iterable object
        Iterable<FieldValueList> iterable = result.iterateAll();
        
        // convert iterable result into JSON string joiner
        StringJoiner strJoin = new StringJoiner(",");
        iterable.forEach(s-> {
            strJoin.add(s.get("json").getStringValue());
        });

        // modify joined strings by turning them into a list of jobs in JSON format
        return "[" + strJoin.toString() + "]";
    }




    // ****************************************************************
    // ********************* API ENDPOINTS ****************************
    // ****************************************************************

    @GetMapping("/GET/public-data")
    public String getPublicData() throws Exception {
        // gets full table data for publically available data (up to 100 jobs)
        String newQuery = (
                        "SELECT * FROM `ctg-storage.bigquery_billing_export.gcp_billing_export_v1_01150A_B8F62B_47D999` " +
                        "WHERE DATE(_PARTITIONTIME) = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) " + 
                        "LIMIT 100");
        return getJSONFromQuery(newQuery,"public");
    }

    @GetMapping("/GET/private-data")
    public String getPrivateData() throws Exception {
        // gets full table data for our private data (up to 100 jobs)
        String query = ("SELECT * FROM `profitable-infra-consumption.all_billing_data.gcp_billing_export_v1_0124FF_8C7296_9F0D41` " +
                        "WHERE DATE(_PARTITIONTIME) = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) " + 
                        "LIMIT 100");
        return getJSONFromQuery(query,"private");
    }
}
