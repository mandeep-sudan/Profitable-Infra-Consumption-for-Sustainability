package com.example.backend.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import com.google.api.gax.paging.Page;
import com.google.cloud.bigquery.Job;

@Data
// @AllArgsConstructor
public class ModifiedPage {
    private List<ModifiedJob> jobsList;
    private String nextPageToken;
    
    public ModifiedPage(Page<Job> jobPage) {
        this.nextPageToken = jobPage.getNextPageToken();
        this.jobsList = new ArrayList<ModifiedJob>();
        for (Job job : jobPage.getValues()) {
            this.jobsList.add(new ModifiedJob(job));
        }
    }
    
}