package com.example.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QueryParams {
    private List<Match> matches;
    private List<BetweenValues> betweenValues;
    private List<BetweenDates> betweenDates;
    private List<Sorting> sortings;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Match {
        private String field;
        private String value;
        private String operator;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BetweenValues {
        private String field;
        private Double lowNumber;
        private Double highNumber;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BetweenDates {
        private String field;
        private String startDateTime;
        private String endDateTime;
    }
    
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Sorting {
        private String field;
        private boolean ascending;
    }
}