package com.example.backend.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

import com.google.api.gax.paging.Page;
import com.google.cloud.bigquery.Job;

@Data
// @AllArgsConstructor
public class ModifiedPage {
    private List<ModifiedJob> rowList;
    private String nextPageInfo;
    
    public ModifiedPage(Page<Job> jobPage) {
        this.nextPageInfo = jobPage.getNextPageToken();
        this.rowList = new ArrayList<ModifiedJob>();
        for (Job job : jobPage.getValues()) {
            this.rowList.add(new ModifiedJob(job));
        }
    }

}