package com.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class AutoMLResponse {

    @Data
    @AllArgsConstructor
    public class Prediction {
        private String content;
    }

    private List<Prediction> predictions;
}
