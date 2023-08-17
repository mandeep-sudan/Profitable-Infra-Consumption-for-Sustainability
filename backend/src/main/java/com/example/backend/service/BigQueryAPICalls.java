package com.example.backend.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.StringJoiner;
import java.util.UUID;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.model.AllData;
import com.example.backend.model.CostByMonth;
import com.example.backend.model.CostByProject;
import com.example.backend.model.CostByService;
import com.example.backend.model.CostByWeekAndService;
import com.example.backend.model.BigQueryJob;
// import com.example.backend.model.ModifiedJob;
import com.example.backend.model.BigQueryJobsPage;
import com.example.backend.model.QueryPage;
import com.example.backend.model.QueryParams;
import com.example.backend.model.QueryParams.BetweenDates;
import com.example.backend.model.QueryParams.BetweenValues;
import com.example.backend.model.QueryParams.Match;
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
    int pageSize = 50;

    String detailedString = "profitable-infra-consumption.all_billing_data.gcp_billing_export_resource_v1_0124FF_8C7296_9F0D41";


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

    // helper function to get JSON string from a given query
    <T> QueryPage<T> getDataFromQueryPaginated(String oldQuery, Class<T> resultType, int pageNum) throws Exception {
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

        return new QueryPage<T>(resultSet, pageNum + 1);
    }

    String restrictDate(String oldString) {
        return " ";
        // if (oldString == null) {
        //     return " ";
        // }
        // String temp = " WHERE usage_start_time >= CURRENT_TIMESTAMP() - INTERVAL " +
        //         oldString.replace("-", " ") + " ";
        // return temp;
    }

    void getMatchesString(QueryParams queryParams, StringJoiner output) {
        if (queryParams == null || queryParams.getMatches() == null || 
        queryParams.getMatches().size() == 0) {
            return;
        }
        List<Match> matches = queryParams.getMatches();
        // StringJoiner output = new StringJoiner(" AND ");
        
        for (int i=0;i<matches.size();i++) {
            Match currMatch = matches.get(i);
            String wrappedValue;
            if (currMatch.getOperator().equals("LIKE")) {
                wrappedValue = "\'%"+currMatch.getValue()+"%\'";
            } else { // operator is '='
                wrappedValue = "\'"+currMatch.getValue()+"\'";
            }
            output.add(currMatch.getField()+" "+currMatch.getOperator()+" "+wrappedValue);
        }
    }

    void getBetweenValuesString(QueryParams queryParams, StringJoiner output) {
        if (queryParams == null || queryParams.getBetweenValues() == null || 
        queryParams.getBetweenValues().size() == 0) {
            return;
        }
        List<BetweenValues> betweenValues = queryParams.getBetweenValues();
        // StringJoiner output = new StringJoiner(" AND ");
        
        for (int i=0;i<betweenValues.size();i++) {
            BetweenValues currBetweenValues = betweenValues.get(i);
            if (currBetweenValues.getLowNumber()!=null) {
                output.add(currBetweenValues.getField()+" > "+currBetweenValues.getLowNumber());
            }
            if (currBetweenValues.getHighNumber()!=null) {
                output.add(currBetweenValues.getField()+" < "+currBetweenValues.getHighNumber());
            }
        }
    }

    void getBetweenDatesString(QueryParams queryParams, StringJoiner output) {
        if (queryParams == null || queryParams.getBetweenDates() == null || 
        queryParams.getBetweenDates().size() == 0) {
            return;
        }
        List<BetweenDates> betweenDates = queryParams.getBetweenDates();
        // StringJoiner output = new StringJoiner(" AND ");
        
        for (int i=0;i<betweenDates.size();i++) {
            BetweenDates currBetweenValues = betweenDates.get(i);
            if (currBetweenValues.getStartDateTime()!=null) {
                output.add(currBetweenValues.getField()+" > \'"+currBetweenValues.getStartDateTime()+"\'");
            }
            if (currBetweenValues.getEndDateTime()!=null) {
                output.add(currBetweenValues.getField()+" < \'"+currBetweenValues.getEndDateTime()+"\'");
            }
        }
    }

    String getFullFiltering(QueryParams queryParams) {
        StringJoiner output = new StringJoiner(" AND ");

        getBetweenValuesString(queryParams, output);
        getMatchesString(queryParams, output);
        getBetweenDatesString(queryParams, output);
        if (output.length()==0) {
            return " ";
        }
        return " WHERE " + output.toString() + " ";
    }

    // ****************************************************************
    // ********************* BIGQUERY CALLS ***************************
    // ****************************************************************

    public QueryPage<AllData> getAllData(String range,String currPageNum) throws Exception {
        int pageNum;
        if (currPageNum=="") {
            pageNum=0;
        } else {
            pageNum= Integer.parseInt(currPageNum);
        }
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
                restrictDate(range) + " ORDER BY usage_start_time DESC LIMIT " + pageSize + " OFFSET " + pageNum * pageSize;
        return getDataFromQueryPaginated(query,AllData.class,pageNum);
    }
    

    public QueryPage<AllData> getAllDataNew(String currPageNum, QueryParams queryParams) throws Exception {
        int pageNum;
        if (currPageNum=="") {
            pageNum=0;
        } else {
            pageNum= Integer.parseInt(currPageNum);
        }
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
                + detailedString + getFullFiltering(queryParams) +
                " ORDER BY usage_start_time DESC LIMIT " + pageSize + " OFFSET " + pageNum * pageSize;
        System.out.println(query);
        return getDataFromQueryPaginated(query,AllData.class,pageNum);
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
    // restrictDate(range) + " LIMIT " + pageSize;
    // return getDataFromQuery(query);
    // }

    public List<CostByMonth> getCostByMonth(String range) throws Exception {
        // gets full table data for our private data (up to 100 jobs)
        String query = """
                SELECT
                invoice.month as name,
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
                        """ + " " + pageSize;

        return getDataFromQuery(query, CostByMonth.class);
    }

    public List<CostByService> getCostByService(String range) throws Exception {

        String query = """
                SELECT
                service.description as name,
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
                        """ + " " + pageSize;

        return getDataFromQuery(query, CostByService.class);
    }

    public List<CostByProject> getCostByProject(String range) throws Exception {
        // TO DO: make sure that TO_JSON_STRING(project.labels) as project_labels,
        // wasn't needed
        String query = """
                SELECT
                project.name as name,
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
                        """ + " " + pageSize;
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
    // """ + " " + pageSize;
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
    // " " + pageSize;

    // return getDataFromQuery(query);
    // }

    public List<CostByWeekAndService> getCostByWeekAndService(String range) throws Exception {
        // gets full table data for our private data (up to 100 jobs)
        String query = """
                SELECT
                service.description as name,
                DATE(TIMESTAMP_TRUNC(usage_start_time,WEEK)) as week,
                sum(cost) as total_cost,
                SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
                total_credits,
                sum(cost) + SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
                final_cost,
                FROM
                """ + " " + detailedString + restrictDate(range) +
                """
                        GROUP BY 1,2
                        ORDER BY 2,1
                        LIMIT
                        """ +
                " " + pageSize;
        return getDataFromQuery(query, CostByWeekAndService.class);
    }

    public BigQueryJobsPage getJobsList(String pageToken) {

        // BigQuery bigquery = BigQueryOptions.getDefaultInstance().getService();
        Page<Job> jobs;

        if (pageToken == null) {
            // Means it is the first x jobs
            jobs = bigQuery.listJobs();
        } else {
            // Means it is the next x jobs
            jobs = bigQuery.listJobs(BigQuery.JobListOption.pageToken(pageToken));
        }

        if (jobs == null) {
            System.out.println("Dataset does not contain any jobs.");
            // return;
        }

        BigQueryJobsPage resultPage = new BigQueryJobsPage(jobs);

        return resultPage;
    }
}
