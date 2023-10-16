package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ForecastTimeline {
    private Double predictedCost;
    private String serviceDesc;
    private String usageDate;
}
