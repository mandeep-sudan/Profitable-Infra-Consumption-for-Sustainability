package com.example.backend.repository;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.StringJoiner;
import java.util.UUID;

import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;

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

@Repository
public class BigQueryAPICalls {
    // fields
    BigQuery privateBigQuery;
    BigQuery publicBigQuery;
    String publicString = "ctg-storage.bigquery_billing_export.gcp_billing_export_v1_01150A_B8F62B_47D999";
    String privateString = "profitable-infra-consumption.all_billing_data.gcp_billing_export_v1_0124FF_8C7296_9F0D41";
    String privateCostString = "profitable-infra-consumption.all_billing_data.cloud_pricing_export";
    String privateDetailedString = "profitable-infra-consumption.all_billing_data.gcp_billing_export_resource_v1_0124FF_8C7296_9F0D41";

    // ****************************************************************
    // ********************** CONSTRUCTOR(S) **************************
    // ****************************************************************

    // Constructor to instantiate public and private bigquery instances for later use
    public BigQueryAPICalls() throws IOException {
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
    // ************************ GET JSON ******************************
    // ****************************************************************

    public String getAllPublicData() throws Exception {
        // gets full table data for publically available data (up to 100 jobs)

        String newQuery = (
                        "SELECT * FROM " + publicString +
                        " WHERE DATE(_PARTITIONTIME) = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) " + 
                        "LIMIT 15");
        return getJSONFromQuery(newQuery,"public");
    }

    @GetMapping("/private-data/cost-for-gcp")
    public String getCostPricingExportPrivate() throws Exception {
        // gets full table data for publically available data (up to 100 jobs)

        String newQuery = (
                        "SELECT * FROM " + privateCostString +
                        " WHERE DATE(_PARTITIONTIME) = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) " + 
                        "LIMIT 15");
        return getJSONFromQuery(newQuery,"private");
    }
    
    public String getPublicDataByMonth() throws Exception {
        // gets full table data for our private data (up to 100 jobs)
        String query = ("SELECT invoice.month, (SUM(CAST(cost * 1000000 AS int64)) " +
                            "+ SUM(IFNULL((SELECT SUM(CAST(c.amount * 1000000 as int64)) " +
                            "FROM UNNEST(credits) c), 0))) / 1000000 AS total_exact " +
                            "FROM " + publicString +
                            " GROUP BY 1 " +
                            "ORDER BY 1 ASC " +
                            "LIMIT 15");

        return getJSONFromQuery(query,"public");
    }

    public String getAllPrivateData() throws Exception {
        // gets full table data for our private data (up to 100 jobs)
        String query = ("SELECT * FROM " + privateString +
                        " WHERE DATE(_PARTITIONTIME) = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) " + 
                        "LIMIT 15");
        return getJSONFromQuery(query,"private");
    }

    public String getDetailedPrivateData() throws Exception {
        // gets full table data for our private data (up to 100 jobs)
        String query = ("SELECT * FROM " + privateDetailedString +
                        " WHERE DATE(_PARTITIONTIME) = DATE_SUB(CURRENT_DATE(), INTERVAL 1 DAY) " + 
                        "LIMIT 15");
        return getJSONFromQuery(query,"private");
    }

    public String getPrivateDataByMonth() throws Exception {
        // gets full table data for our private data (up to 100 jobs)
        String query = ("SELECT invoice.month, (SUM(CAST(cost * 1000000 AS int64)) " +
                            "+ SUM(IFNULL((SELECT SUM(CAST(c.amount * 1000000 as int64)) " +
                            "FROM UNNEST(credits) c), 0))) / 1000000 AS total_exact " +
                            "FROM " + privateString +
                            " GROUP BY 1 " +
                            "ORDER BY 1 ASC " +
                            "LIMIT 15");

        return getJSONFromQuery(query,"public");
    }
}
