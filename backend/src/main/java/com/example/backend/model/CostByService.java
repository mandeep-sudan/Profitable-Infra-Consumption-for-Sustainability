package com.example.backend.model;

// import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CostByService {
    private String description;
    private Double totalCost;
    private Double totalCredits;
    private Double finalCost;
    // private List<AnotherNestedObject> yo;

    // @Data
    // @AllArgsConstructor
    // public class AnotherNestedObject {
    //     private String hello;
    //     private Double there;
    // }
}
