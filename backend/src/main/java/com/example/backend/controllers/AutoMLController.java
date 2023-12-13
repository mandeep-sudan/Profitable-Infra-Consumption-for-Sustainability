package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.AutoMLClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
public class AutoMLController {

    @Autowired
    AutoMLClient autoMLClient;

    @PostMapping(value = "/api/automl")
    public String makePrediction(@RequestBody String query) throws Exception {
        return autoMLClient.textToQuery(
                query).getPredictions().get(0).getContent();
    }
}
