package com.example.backend.model;

import lombok.Data;

import com.google.cloud.bigquery.Job;
import com.google.cloud.bigquery.QueryJobConfiguration;

import lombok.AllArgsConstructor;

@Data
// @AllArgsConstructor
public class ModifiedJob {
    private String jobId;
    private String projectId;
    // private String query;
    private String email;
    private String status;

    private Long creationTime;
    private Long startTime;
    private Long endTime;
    // private Double totalBytesProcessed;
    // private Double finalExecutionDurationMs;
    public ModifiedJob(Job job) {
        this.jobId = job.getJobId().getJob();
        this.projectId = job.getJobId().getProject();

        this.email = job.getUserEmail();
        this.status = job.getStatus().getState().toString(); // TO DO: FIX THIS IT PROBABLY SHOULDN'T JUST BE TOSTRING

        // this.query = job.getConfiguration();
        this.creationTime = job.getStatistics().getCreationTime();
        this.startTime = job.getStatistics().getStartTime();
        this.endTime = job.getStatistics().getEndTime();
        // this.totalBytesProcessed = job.getStatistics();
        // this.finalExecutionDurationMs = job.getStatistics();

    }
}