package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Forecast {
    private Double predictedCost;

    private String billingAccountId;
    private Service service;
    private Sku sku;
    private String usageStartTime;
    private String usageEndTime;
    private Location location;
    private String transactionType;
    private String exportTime;
    private Double cost;
    private String currency;
    private Usage usage;
    private Invoice invoice;
    private String costType;
    private Double costAtList;

    @Data
    @AllArgsConstructor
    public class Service {
        private String id;
        private String desctiption;
    }

    @Data
    @AllArgsConstructor
    public class Sku {
        private String id;
        private String desctiption;
    }

    @Data
    @AllArgsConstructor
    public class Location {
        private String location;
        private String country;
        private String region;
        private String zone;
    }

    @Data
    @AllArgsConstructor
    public class Usage {
        private Double amount;
        private String unit;
        private Double amountInPricingUnits;
        private String pricingUnit;
    }

    @Data
    @AllArgsConstructor
    public class Invoice {
        private String month;
    }

}