package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Forecast {
    private Double predictedCost;
    private String serviceDesc;
    private String skuDesc;
    private String usageDate;
}