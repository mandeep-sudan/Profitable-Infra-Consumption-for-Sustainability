package com.example.backend.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import com.google.api.gax.paging.Page;
import com.google.cloud.bigquery.Job;

@Data
// @AllArgsConstructor
public class BigQueryJobsPage {
    private List<BigQueryJob> rowList;
    private String nextPageInfo;
    
    public BigQueryJobsPage(Page<Job> jobPage) {
        this.nextPageInfo = jobPage.getNextPageToken();
        this.rowList = new ArrayList<BigQueryJob>();
        for (Job job : jobPage.getValues()) {
            this.rowList.add(new BigQueryJob(job));
        }
    }

}