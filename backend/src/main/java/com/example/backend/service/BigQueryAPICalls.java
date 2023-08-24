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
// import com.example.backend.model.ModifiedJob;
import com.example.backend.model.BigQueryJobsPage;
import com.example.backend.model.BigQueryQueryParams;
import com.example.backend.model.QueryPage;
import com.example.backend.model.BillingQueryParams;
import com.example.backend.model.BillingQueryParams.BillingBetweenDates;
import com.example.backend.model.BillingQueryParams.BillingBetweenValues;
import com.example.backend.model.BillingQueryParams.BillingMatch;
import com.example.backend.model.BillingQueryParams.BillingSorting;
import com.google.api.gax.paging.Page;
import com.google.cloud.bigquery.BigQuery;
// import com.google.cloud.bigquery.BigQueryException;
import com.google.cloud.bigquery.FieldValueList;
import com.google.cloud.bigquery.Job;
import com.google.cloud.bigquery.JobId;
import com.google.cloud.bigquery.JobInfo;
import com.google.cloud.bigquery.JobStatus;
import com.google.cloud.bigquery.QueryJobConfiguration;
import com.google.cloud.bigquery.TableResult;
import com.google.cloud.bigquery.BigQuery.JobListOption;
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
        // return " ";
        // }
        // String temp = " WHERE usage_start_time >= CURRENT_TIMESTAMP() - INTERVAL " +
        // oldString.replace("-", " ") + " ";
        // return temp;
    }

    // BILLING HELPERS

    void getMatchesString(BillingQueryParams queryParams, StringJoiner output) {
        if (queryParams == null || queryParams.getMatches() == null ||
                queryParams.getMatches().size() == 0) {
            return;
        }
        List<BillingMatch> matches = queryParams.getMatches();
        // StringJoiner output = new StringJoiner(" AND ");

        for (int i = 0; i < matches.size(); i++) {
            BillingMatch currMatch = matches.get(i);
            String wrappedValue;
            String not = "";
            if (currMatch.getOperator().equals("LIKE")) {
                wrappedValue = "\'%" + currMatch.getValue() + "%\'";
            } else { // operator is '='
                wrappedValue = "\'" + currMatch.getValue() + "\'";
            }
            if (currMatch.isNot()) {
                not = "NOT ";
            }
            output.add(not + currMatch.getField() + " " + currMatch.getOperator() + " " + wrappedValue);
        }
    }

    void getBetweenValuesString(BillingQueryParams queryParams, StringJoiner output) {
        if (queryParams == null || queryParams.getBetweenValues() == null ||
                queryParams.getBetweenValues().size() == 0) {
            return;
        }
        List<BillingBetweenValues> betweenValues = queryParams.getBetweenValues();
        // StringJoiner output = new StringJoiner(" AND ");

        for (int i = 0; i < betweenValues.size(); i++) {
            BillingBetweenValues currBetweenValues = betweenValues.get(i);

            if (currBetweenValues.getLowNumber() != null) {
                if (currBetweenValues.isInclusive()) {
                    output.add(currBetweenValues.getField() + " >= " + currBetweenValues.getLowNumber());
                } else {
                    output.add(currBetweenValues.getField() + " > " + currBetweenValues.getLowNumber());
                }
            }
            if (currBetweenValues.getHighNumber() != null) {
                if (currBetweenValues.isInclusive()) {
                    output.add(currBetweenValues.getField() + " <= " + currBetweenValues.getHighNumber());
                } else {
                    output.add(currBetweenValues.getField() + " < " + currBetweenValues.getHighNumber());
                }
            }

        }
    }

    void getBetweenDatesString(BillingQueryParams queryParams, StringJoiner output) {
        if (queryParams == null || queryParams.getBetweenDates() == null ||
                queryParams.getBetweenDates().size() == 0) {
            return;
        }
        List<BillingBetweenDates> betweenDates = queryParams.getBetweenDates();
        // StringJoiner output = new StringJoiner(" AND ");

        for (int i = 0; i < betweenDates.size(); i++) {
            BillingBetweenDates currBetweenDates = betweenDates.get(i);

            if (currBetweenDates.getStartDateTime() != null) {
                if (currBetweenDates.isInclusive()) {
                    output.add(currBetweenDates.getField() + " >= \'" + currBetweenDates.getStartDateTime() + "\'");
                } else {
                    output.add(currBetweenDates.getField() + " > \'" + currBetweenDates.getStartDateTime() + "\'");
                }
            }
            if (currBetweenDates.getEndDateTime() != null) {
                if (currBetweenDates.isInclusive()) {
                    output.add(currBetweenDates.getField() + " <= \'" + currBetweenDates.getEndDateTime() + "\'");
                } else {
                    output.add(currBetweenDates.getField() + " < \'" + currBetweenDates.getEndDateTime() + "\'");
                }

            }
        }
    }

    StringJoiner getOrderingString(BillingQueryParams queryParams) {
        StringJoiner output = new StringJoiner(", ");
        if (queryParams == null || queryParams.getSortings() == null ||
                queryParams.getSortings().size() == 0) {
            return output;
        }
        List<BillingSorting> sortings = queryParams.getSortings();

        // StringJoiner output = new StringJoiner(" AND ");

        for (int i = 0; i < sortings.size(); i++) {
            BillingSorting currSorting = sortings.get(i);

            if (currSorting.isAscending()) {
                output.add(currSorting.getField());
            } else {
                output.add(currSorting.getField() + " DESC");
            }
        }
        return output;
    }

    String getFullFiltering(BillingQueryParams queryParams) {
        StringJoiner output = new StringJoiner(" AND ");

        getBetweenValuesString(queryParams, output);
        getMatchesString(queryParams, output);
        getBetweenDatesString(queryParams, output);
        StringJoiner sortingStringJoiner = getOrderingString(queryParams);
        if (output.length() == 0 && sortingStringJoiner.length() == 0) {
            return " ";
        }
        if (output.length() == 0) {
            return " ORDER BY " + sortingStringJoiner.toString() + " ";
        }
        if (sortingStringJoiner.length() == 0) {
            return " WHERE " + output.toString() + " ";
        }
        return " WHERE " + output.toString() + " ORDER BY " + sortingStringJoiner.toString() + " ";
    }

    void allUsersModifier(BigQueryQueryParams queryParams, List<JobListOption> jobListOptions) {
        // if (queryParams)
        if (queryParams.isAllUsers()) {
            jobListOptions.add(JobListOption.allUsers());
        }
    }

    void maxCreationTimeModifier(BigQueryQueryParams queryParams, List<JobListOption> jobListOptions) {
        // if (queryParams)
        if (queryParams.getMaxCreationTime() != null) {
            jobListOptions.add(JobListOption.maxCreationTime(queryParams.getMaxCreationTime()));
        }
    }

    void minCreationTimeModifier(BigQueryQueryParams queryParams, List<JobListOption> jobListOptions) {
        // if (queryParams)
        if (queryParams.getMinCreationTime() != null) {
            jobListOptions.add(JobListOption.minCreationTime(queryParams.getMinCreationTime()));
        }
    }

    void parentJobIdModifier(BigQueryQueryParams queryParams, List<JobListOption> jobListOptions) {
        // if (queryParams)
        if (queryParams.getParentJobId() != null && queryParams.getParentJobId() != "") {
            jobListOptions.add(JobListOption.parentJobId(queryParams.getParentJobId()));
        }
    }

    void stateFiltersModifier(BigQueryQueryParams queryParams, List<JobListOption> jobListOptions) {
        // if (queryParams)
        List<JobStatus.State> jobstates = new ArrayList<JobStatus.State>();
        List<String> stateFilters = queryParams.getStateFilters();
        for (int i=0;i<stateFilters.size();i++) {
            jobstates.add(JobStatus.State.valueOf(stateFilters.get(i)));
        }
        queryParams.getStateFilters().stream().map(jobState->jobstates.add(JobStatus.State.valueOf(jobState)));
        if (queryParams.getStateFilters().size() > 0) {
            jobListOptions.add(JobListOption.stateFilter(jobstates.toArray(new JobStatus.State[0])));
        }
    }

    // BIGQUERY HELPERS
    JobListOption[] jobListOptionGivenParams(BigQueryQueryParams queryParams) {
        List<JobListOption> jobListOptions = new ArrayList<JobListOption>();
        allUsersModifier(queryParams, jobListOptions);
        maxCreationTimeModifier(queryParams, jobListOptions);
        minCreationTimeModifier(queryParams, jobListOptions);
        parentJobIdModifier(queryParams, jobListOptions);
        stateFiltersModifier(queryParams,jobListOptions);
        return jobListOptions.toArray(new JobListOption[0]);
        // return jobListOption.maxCreationTime(100000000).allUsers();
    }

    // ****************************************************************
    // ********************* BIGQUERY CALLS ***************************
    // ****************************************************************

    public QueryPage<AllData> getBillingData(String currPageNum, BillingQueryParams queryParams) throws Exception {
        int pageNum;
        if (currPageNum == "") {
            pageNum = 0;
        } else {
            pageNum = Integer.parseInt(currPageNum);
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
                " LIMIT " + pageSize + " OFFSET " + pageNum * pageSize;
        return getDataFromQueryPaginated(query, AllData.class, pageNum);
    }

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

    public BigQueryJobsPage getJobsListNew(String pageToken, BigQueryQueryParams bigQueryQueryParams) {
        // BigQuery bigquery = BigQueryOptions.getDefaultInstance().getService();
        Page<Job> jobs;

        if (pageToken == "") {
            // Means it is the first x jobs
            jobs = bigQuery.listJobs(jobListOptionGivenParams(bigQueryQueryParams));
        } else if (pageToken == null) {
            // Means it is the next x jobs
            jobs = bigQuery.listJobs(JobListOption.maxCreationTime(0));
        } else {
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
