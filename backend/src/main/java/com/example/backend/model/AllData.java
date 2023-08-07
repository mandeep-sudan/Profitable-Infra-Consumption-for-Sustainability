package com.example.backend.model;

// import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AllData {
    private String billingAccountId;

    private String service;
    private String sku;
    private String usageStartTime;
    private String usageEndTime;
    private String usageDurationSeconds;
    private String projectId;
    private String projectName;
    private String location;
    private String resourceName;
    private String resourceGlobalName;
    private String exportTime;
    private Float cost;
    private String currency;
    private Double usageAmount;
    private String usageUnit;
    private Credit[] credits; // TO DO: Ensure that this is the correct unit
    private String invoiceMonth;    

    @Data
    @AllArgsConstructor
    public class Credit {
        private String id;
        private String fullName;
        private String type;
        private String name;
        private Float amount;
    }

}
