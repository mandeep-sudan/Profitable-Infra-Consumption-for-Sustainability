package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.repository.BigQueryAPICalls;

/*
HELPFUL LINKS:
    (1) Query a public dataset with BigQuery client libraries
        https://cloud.google.com/bigquery/docs/quickstarts/quickstart-client-libraries

    (2) Authenticating with a service account key file for BigQuery
        https://cloud.google.com/bigquery/docs/authentication/service-account-file

    (3) Convert BigQuery output easily to JSON
        https://stackoverflow.com/questions/44150064/how-to-get-query-result-in-json-form-using-java-api-of-google-bigquery
*/ 

@CrossOrigin(origins = "http://localhost:5173")
@RestController
// @RequestMapping("api/")
public class BigQueryController {
    // fields
    @Autowired
    BigQueryAPICalls bigQueryAPICalls;

    // ****************************************************************
    // ************************ API CALLS *****************************
    // ****************************************************************

    @GetMapping("/public-data/all-data")
    public String getAllPublicData() throws Exception {
        // gets full table data for publically available data (up to 100 jobs)
        return bigQueryAPICalls.getAllPublicData();
    }

    @GetMapping("/private-data/cost-for-gcp")
    public String getCostPricingExportPrivate() throws Exception {
        return bigQueryAPICalls.getCostPricingExportPrivate();
    }
    
    @GetMapping("/public-data/cost-by-month")
    public String getPublicDataByMonth() throws Exception {
        return bigQueryAPICalls.getPublicDataByMonth();
    }

    @GetMapping("/private-data/all-data")
    public String getAllPrivateData() throws Exception {
        return bigQueryAPICalls.getAllPrivateData();
    }

    @GetMapping("/private-data/all-detailed-data")
    public String getDetailedPrivateData() throws Exception {
        return bigQueryAPICalls.getDetailedPrivateData();
    }

    @GetMapping("/private-data/cost-by-month")
    public String getPrivateDataByMonth() throws Exception {
        return bigQueryAPICalls.getPrivateDataByMonth();
    }
}
