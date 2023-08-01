package com.example.backend.repository;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.StringJoiner;
import java.util.UUID;

import org.springframework.stereotype.Repository;

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
    // BigQuery privateBigQuery;
    BigQuery bigQuery;
    int limit = 15;
    // String publicString = "ctg-storage.bigquery_billing_export.gcp_billing_export_v1_01150A_B8F62B_47D999";
    // String privateString = "profitable-infra-consumption.all_billing_data.gcp_billing_export_v1_0124FF_8C7296_9F0D41";
    // String privateCostString = "profitable-infra-consumption.all_billing_data.cloud_pricing_export";
    String detailedString = "profitable-infra-consumption.all_billing_data.gcp_billing_export_resource_v1_0124FF_8C7296_9F0D41";

    // ****************************************************************
    // ********************** CONSTRUCTOR(S) **************************
    // ****************************************************************

    // Constructor to instantiate public and private bigquery instances for later
    // use
    public BigQueryAPICalls() throws IOException {
        // (1) INSTANTIATE PRIVATE CLIENT
        // https://cloud.google.com/bigquery/docs/authentication/service-account-file

        String projectId = "profitable-infra-consumption";
        File credentialsPath = new File("C:\\Users\\fwintz\\Downloads\\profitable-infra-consumption-c781e9bccc56.json");
        // File credentialsPath = new
        // File("C:/Users/fwintz/Downloads/profitable-infra-consumption-c781e9bccc56.json");

        // Load credentials from JSON key file. If you can't set the
        // GOOGLE_APPLICATION_CREDENTIALS
        // environment variable, you can explicitly load the credentials file to
        // construct the
        // credentials.
        GoogleCredentials credentials;
        try (FileInputStream serviceAccountStream = new FileInputStream(credentialsPath)) {
            credentials = ServiceAccountCredentials.fromStream(serviceAccountStream);
        }

        // Instantiate a client.
        bigQuery = BigQueryOptions.newBuilder()
                .setCredentials(credentials)
                .setProjectId(projectId)
                .build()
                .getService();

        // Use the client.
        System.out.println("Datasets:");
        for (Dataset dataset : bigQuery.listDatasets().iterateAll()) {
            System.out.printf("%s%n", dataset.getDatasetId().getDataset());
        }

        // // (1) INSTANTIATE PUBLIC CLIENT
        // publicBigQuery = BigQueryOptions.getDefaultInstance().getService();
    }

    // ****************************************************************
    // ******************** HELPER FUNCTION(S) ************************
    // ****************************************************************

    // helper function to get JSON string from a given query
    String getJSONFromQuery(String oldQuery) throws Exception {
        // modify query to make json configuration easier
        // https://stackoverflow.com/questions/44150064/how-to-get-query-result-in-json-form-using-java-api-of-google-bigquery
        String query = "WITH MyTable AS (" + oldQuery +
                ") SELECT TO_JSON_STRING(t) AS json " +
                "FROM MyTable AS t";

        // create query job configuration based on input
        // https://cloud.google.com/bigquery/docs/quickstarts/quickstart-client-libraries
        QueryJobConfiguration queryConfig = QueryJobConfiguration.newBuilder(query)
                // Use standard SQL syntax for queries.
                // See: https://cloud.google.com/bigquery/sql-reference/
                .setUseLegacySql(false)
                .build();

        // Create a job ID so that we can safely retry.
        JobId jobId = JobId.of(UUID.randomUUID().toString());
        Job queryJob = bigQuery.create(JobInfo.newBuilder(queryConfig).setJobId(jobId).build());
        
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
        iterable.forEach(s -> {
            strJoin.add(s.get("json").getStringValue());
        });

        // modify joined strings by turning them into a list of jobs in JSON format
        return "[" + strJoin.toString() + "]";
    }

    String restrictDate(String oldString) {
        if (oldString == null) {
            return "";
        }
        return " WHERE usage_start_time >= CURRENT_TIMESTAMP() - INTERVAL " + 
                oldString.replace("-", " ") + " ";
    }

    // ****************************************************************
    // ********************* BIGQUERY CALLS ***************************
    // ****************************************************************

    public String getAllData(String range) throws Exception {

        String query = "SELECT *,TIMESTAMP_DIFF(usage_end_time, usage_start_time, SECOND) AS usage_duration_seconds FROM " + detailedString +
            restrictDate(range) + " LIMIT "+limit;
 
        return getJSONFromQuery(query);
    }

    public String getImportantColumns(String range) throws Exception {
        
        String query = """
                SELECT billing_account_id,
                service, sku, usage_start_time,
                usage_end_time,
                TIMESTAMP_DIFF(usage_end_time, usage_start_time, SECOND) AS usage_duration_seconds,
                project, labels,
                location, export_time, cost, usage
                FROM 
            """ +
             " " + detailedString +
            restrictDate(range) + " LIMIT "+limit;
        // System.out.println("HEYYYYYYYYY");
        // System.out.println(query);
        return getJSONFromQuery(query);
    }

    public String getCostByMonth(String range) throws Exception {
        // gets full table data for our private data (up to 100 jobs)
        String query = """
                    SELECT
                    invoice.month,
                    sum(cost) as total_cost,
                    SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as total_credits,
                    sum(cost) + SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as final_cost,
                    FROM 
                    """+ " "+ detailedString + " " +
                    restrictDate(range) + " " +
                    """
                    GROUP BY 1
                    ORDER BY 1
                    LIMIT
                    """+" "+limit;

        return getJSONFromQuery(query);
    }

    public String getCostByService(String range) throws Exception {
        
        String query = """
                    SELECT
                    service.description,
                    sum(cost) as total_cost,
                    SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as total_credits,
                    sum(cost) + SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as final_cost,
                    FROM 
                    """+ " "+ detailedString +
                    restrictDate(range) + " " +
                    """
                    GROUP BY 1
                    ORDER BY 1
                    LIMIT
                    """+" "+limit;

        return getJSONFromQuery(query);
    }

    public String getCostByProject(String range) throws Exception {
        // TO DO: make sure that TO_JSON_STRING(project.labels) as project_labels, wasn't needed
        String query = """
                    SELECT
                    project.name,
                    sum(cost) as total_cost,
                    SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as total_credits,
                    sum(cost) + SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as final_cost,
                    FROM 
                    """+ " "+ detailedString +
                    restrictDate(range) + " " +
                    """ 
                    GROUP BY 1
                    ORDER BY 1
                    LIMIT
                    """+" "+limit;

        return getJSONFromQuery(query);
    }

}
