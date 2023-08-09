package com.example.backend.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.AllData;
import com.example.backend.model.CostByMonth;
import com.example.backend.model.CostByProject;
import com.example.backend.model.CostByService;
import com.example.backend.model.ModifiedJob;
import com.example.backend.model.ModifiedPage;
import com.google.api.gax.paging.Page;
import com.google.cloud.bigquery.BigQuery;
// import com.google.cloud.bigquery.BigQueryException;
import com.google.cloud.bigquery.BigQueryOptions;
import com.google.cloud.bigquery.FieldValueList;
import com.google.cloud.bigquery.Job;
import com.google.cloud.bigquery.JobId;
import com.google.cloud.bigquery.JobInfo;
import com.google.cloud.bigquery.QueryJobConfiguration;
import com.google.cloud.bigquery.TableResult;
import com.google.gson.Gson;

@Service
public class BigQueryAPICalls {
    @Autowired
    BigQuery bigQuery;
    @Autowired
    Gson gson;
    int limit = 15;

    String detailedString = "profitable-infra-consumption.all_billing_data.gcp_billing_export_resource_v1_0124FF_8C7296_9F0D41";

    // helper function to get JSON string from a given query
    List<FieldValueList> getJSONFromQueryNew(String query) throws Exception {

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

        // return jsonResults;
        // transform TableResult into Iterable object
        Iterable<FieldValueList> iterable = result.iterateAll();

        List<FieldValueList> retVal = new ArrayList<FieldValueList>();

        String jsonResults = gson.toJson(result, result.getClass());
        System.out.println("jsonResults from GSON: " + jsonResults);

        // // convert iterable result into JSON string joiner
        iterable.forEach(s -> {
            retVal.add(s);
            // jsonResults.add(gson.toJson(s, s.getClass()));
        });

        return retVal;
    }

    // helper function to get JSON string from a given query
    <T> List<T> getDataFromQuery(String oldQuery, Class<T> resultType) throws Exception {
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
        Iterator<FieldValueList> iterator = result.iterateAll().iterator();

        List<T> resultSet = Stream.generate(() -> null)
                .takeWhile(x -> iterator.hasNext())
                .map(n -> gson.fromJson(iterator.next().get("json").getStringValue(), resultType)).toList();

        return resultSet;
    }

    String restrictDate(String oldString) {
        if (oldString == null) {
            return " ";
        }
        String temp = " WHERE usage_start_time >= CURRENT_TIMESTAMP() - INTERVAL " +
                oldString.replace("-", " ") + " ";
        return temp;
    }

    // ****************************************************************
    // ********************* BIGQUERY CALLS ***************************
    // ****************************************************************

    public List<AllData> getAllData(String range) throws Exception {

        String query = """
            SELECT billing_account_id,
                    service.description as service,
                    sku.description as sku,
                    usage_start_time,
                    usage_end_time,
                    TIMESTAMP_DIFF(usage_end_time, usage_start_time, SECOND) AS usage_duration_seconds,
                    project.id as project_id,
                    project.name as project_name,
                    location.location as location,
                    resource.name as resource_name,
                    resource.global_name as resource_global_name,
                    export_time,
                    cost,
                    currency,
                    usage.amount as usage_amount,
                    usage.unit as usage_unit,
                    credits,
                    invoice.month as invoice_month,
                    FROM
        """
                + detailedString +
                restrictDate(range) + " LIMIT " + limit;

        return getDataFromQuery(query,AllData.class);
    }

    // public String getImportantColumns(String range) throws Exception {

    // String query = """
    // SELECT billing_account_id,
    // service, sku, usage_start_time,
    // usage_end_time,
    // TIMESTAMP_DIFF(usage_end_time, usage_start_time, SECOND) AS
    // usage_duration_seconds,
    // project, labels,
    // location, export_time, cost, usage
    // FROM
    // """ +
    // " " + detailedString +
    // restrictDate(range) + " LIMIT " + limit;
    // return getDataFromQuery(query);
    // }

    public List<CostByMonth> getCostByMonth(String range) throws Exception {
        // gets full table data for our private data (up to 100 jobs)
        String query = """
                SELECT
                invoice.month,
                sum(cost) as total_cost,
                SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as total_credits,
                sum(cost) + SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as final_cost,
                FROM
                """ + " " + detailedString + " " +
                restrictDate(range) +
                """
                        GROUP BY 1
                        ORDER BY 1
                        LIMIT
                        """ + " " + limit;

        return getDataFromQuery(query, CostByMonth.class);
    }

    public List<CostByService> getCostByService(String range) throws Exception {

        String query = """
                SELECT
                service.description,
                sum(cost) as total_cost,
                SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
                total_credits,
                sum(cost) + SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
                final_cost,
                FROM
                """ + " " + detailedString +
                restrictDate(range) +
                """
                        GROUP BY 1
                        ORDER BY 1
                        LIMIT
                        """ + " " + limit;

        return getDataFromQuery(query, CostByService.class);
    }

    public List<CostByProject> getCostByProject(String range) throws Exception {
        // TO DO: make sure that TO_JSON_STRING(project.labels) as project_labels,
        // wasn't needed
        String query = """
                SELECT
                project.name,
                sum(cost) as total_cost,
                SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
                total_credits,
                sum(cost) + SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
                final_cost,
                FROM
                """ + " " + detailedString +
                restrictDate(range) +
                """
                        GROUP BY 1
                        ORDER BY 1
                        LIMIT
                        """ + " " + limit;
        return getDataFromQuery(query, CostByProject.class);
    }

    // public List<FieldValueList> getCostByProjectNew(String range) throws
    // Exception {
    // // TO DO: make sure that TO_JSON_STRING(project.labels) as project_labels,
    // // wasn't needed
    // String query = """
    // SELECT
    // project.name,
    // sum(cost) as total_cost,
    // SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
    // total_credits,
    // sum(cost) + SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
    // final_cost,
    // FROM
    // """ + " " + detailedString +
    // restrictDate(range) +
    // """
    // GROUP BY 1
    // ORDER BY 1
    // LIMIT
    // """ + " " + limit;
    // System.out.println(query);
    // return getJSONFromQueryNew(query);
    // }

    // public String getCostByWeek(String range) throws Exception {
    // // TO DO: make sure that TO_JSON_STRING(project.labels) as project_labels,
    // // wasn't needed
    // String query = """
    // SELECT
    // DATE(TIMESTAMP_TRUNC(usage_start_time,WEEK)) as week,
    // sum(cost) as total_cost,
    // SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
    // total_credits,
    // sum(cost) + SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
    // final_cost,
    // FROM
    // """ + " " + detailedString + restrictDate(range) +
    // """
    // GROUP BY week
    // ORDER BY week
    // LIMIT
    // """ +
    // " " + limit;

    // return getDataFromQuery(query);
    // }

    // public String getCostByWeekAndService(String range) throws Exception {
    // // TO DO: make sure that TO_JSON_STRING(project.labels) as project_labels,
    // // wasn't needed
    // String query = """
    // SELECT
    // service.description,
    // DATE(TIMESTAMP_TRUNC(usage_start_time,WEEK)) as week,
    // sum(cost) as total_cost,
    // SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
    // total_credits,
    // sum(cost) + SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
    // final_cost,
    // FROM
    // """ + " " + detailedString + restrictDate(range) +
    // """
    // GROUP BY 1,2
    // ORDER BY 1,2
    // LIMIT
    // """ +
    // " " + limit;

    // return getDataFromQuery(query);
    // }

    public List<ModifiedJob> getJobsList(String range) {
        // try {
            // Initialize client that will be used to send requests. This client only needs
            // to be created
            // once, and can be reused for multiple requests.
            BigQuery bigquery = BigQueryOptions.getDefaultInstance().getService();

            Page<Job> jobs = bigquery.listJobs(BigQuery.JobListOption.pageSize(10));
            if (jobs == null) {
                System.out.println("Dataset does not contain any jobs.");
                // return;
            }
            
            // Gson gson = new Gson();
            // String jsonResults = gson.toJson(result);
            // System.out.println("jsonResults from GSON: " + jsonResults);

            // convert iterable result into JSON string joiner
            // System.out.println("Anything");
            // Iterator<Job> iterator = jobs.iterateAll().iterator();
            List<ModifiedJob> resultSet = new ArrayList<ModifiedJob>();
            // System.out.println(jobs.getValues().iterator().toString());
            for (Job job : jobs.getValues()) {
                // System.out.println(job.toString());
                resultSet.add(new ModifiedJob(job));
            }
            // iterator.forEachRemaining();
            // List<ModifiedJob> resultSet = Stream.generate(() -> null)
            //     .takeWhile(x -> iterator.hasNext())
            //     .map(n -> new ModifiedJob(iterator.next())).toList();
            // System.out.println("else");
            // return gson.toJson(jobs.getValues().iterator().next());
            return resultSet;
            // modify joined strings by turning them into a list of jobs in JSON format
            // return strJoinAll.toString();
        // } catch (BigQueryException e) {
        //     System.out.println("Jobs not listed in dataset due to error: \n" + e.toString());
        // }
    }
    public ModifiedPage getJobsList2(String pageToken) {
        
        BigQuery bigquery = BigQueryOptions.getDefaultInstance().getService();
        Page<Job> jobs;

        if (pageToken == null) {
            // Means it is the first x jobs
            jobs = bigquery.listJobs();
        } else {
            // Means it is the next x jobs
            jobs = bigquery.listJobs(BigQuery.JobListOption.pageToken(pageToken));
        }

        if (jobs == null) {
            System.out.println("Dataset does not contain any jobs.");
            // return;
        }

        ModifiedPage resultPage = new ModifiedPage(jobs);

        return resultPage;
    }
}
