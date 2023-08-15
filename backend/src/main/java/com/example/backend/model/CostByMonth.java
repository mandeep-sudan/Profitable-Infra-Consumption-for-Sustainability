package com.example.backend.model;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class CostByMonth {
    private String name;
    private Double totalCost;
    private Double totalCredits;
    private Double finalCost;
}