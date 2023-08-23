package com.example.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BigQueryQueryParams {
    private boolean allUsers;
    private Long minCreationTime;
    private Long maxCreationTime;
    // private Projection projection;
    private List<String> stateFilters;
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