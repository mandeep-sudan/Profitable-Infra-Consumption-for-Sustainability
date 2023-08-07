package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CostByProject {
    private String name;
    private Double totalCost;
    private Double totalCredits;
    private Double finalCost;
}
