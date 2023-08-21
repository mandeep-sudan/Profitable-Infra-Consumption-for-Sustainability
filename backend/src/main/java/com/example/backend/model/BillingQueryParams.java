package com.example.backend.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BillingQueryParams {
    private List<BillingMatch> matches;
    private List<BillingBetweenValues> betweenValues;
    private List<BillingBetweenDates> betweenDates;
    private List<BillingSorting> sortings;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BillingMatch {
        private String field;
        private String value;
        private String operator;
        private boolean not;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BillingBetweenValues {
        private String field;
        private Double lowNumber;
        private Double highNumber;
        private boolean inclusive;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BillingBetweenDates {
        private String field;
        private String startDateTime;
        private String endDateTime;
        private boolean inclusive;
    }
    
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class BillingSorting {
        private String field;
        private boolean ascending;
    }
}