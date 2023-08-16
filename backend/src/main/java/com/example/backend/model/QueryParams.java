package com.example.backend.model;

import lombok.Data;

import java.util.List;

import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class QueryParams {
    private List<Match> matches;

    @Data
    @AllArgsConstructor
    public class Match {
        private String field;
        private String value;
        private String operator;
    }
}