package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.service.AutoMLClient;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
public class AutoMLController {

    @Autowired
    AutoMLClient autoMLClient;

    @GetMapping(value = "/api/automl")
    public String makePrediction() throws Exception {
        return autoMLClient.getToken();
    }
}
