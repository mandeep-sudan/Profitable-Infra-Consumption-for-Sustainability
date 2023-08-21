package com.example.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BigQueryQueryParams {
    private boolean allUsers;
    private int maxResults;
    private String minCreationTime;
    private String maxCreationTime;
    // private Projection projection;
    // private StateFilter stateFilter;
    private String parentJobId;

    public static enum Projection {
        MINIMAL,
        FULL
    };

    public static enum StateFilter {
        DONE,
        PENDING,
        RUNNING
    };
}