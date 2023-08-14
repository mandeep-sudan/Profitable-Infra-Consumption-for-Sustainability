package com.example.backend.model;

import lombok.Data;

import com.google.cloud.bigquery.Job;
import com.google.cloud.bigquery.QueryJobConfiguration;

// import lombok.AllArgsConstructor;

@Data
// @AllArgsConstructor
public class BigQueryJob {
    private String jobId;
    private String projectId;
    private String query;
    private String email;
    private String status;
    // private String type;

    private Long creationTime;
    private Long startTime;
    private Long endTime;
    // private Double totalBytesProcessed;
    // private Double finalExecutionDurationMs;
    public BigQueryJob(Job job) {
        // type casted JobConfiguration to QueryJobConfiguration
        // https://cloud.google.com/java/docs/reference/google-cloud-bigquery/2.23.2/com.google.cloud.bigquery.QueryJobConfiguration
        QueryJobConfiguration queryJobConfig = job.getConfiguration();
        this.jobId = job.getJobId().getJob();
        this.projectId = job.getJobId().getProject();

        this.email = job.getUserEmail();
        this.status = job.getStatus().getState().toString(); // TO DO: FIX THIS IT PROBABLY SHOULDN'T JUST BE TOSTRING
        
        this.query = queryJobConfig.getQuery();
        this.creationTime = job.getStatistics().getCreationTime();
        this.startTime = job.getStatistics().getStartTime();
        this.endTime = job.getStatistics().getEndTime();
        // this.totalBytesProcessed = job.getStatistics();
        // this.finalExecutionDurationMs = job.getStatistics();

    }
}