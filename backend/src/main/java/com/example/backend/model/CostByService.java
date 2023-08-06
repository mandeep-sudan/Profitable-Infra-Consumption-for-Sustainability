package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CostByService {
    private String description;
    private Double totalCost;
    private Double totalCredits;
    private Double finalCost;
}
