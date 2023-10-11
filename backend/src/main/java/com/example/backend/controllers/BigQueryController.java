package com.example.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.AllData;
import com.example.backend.model.CostByMonth;
import com.example.backend.model.CostByProject;
import com.example.backend.model.CostByService;
import com.example.backend.model.CostByWeekAndService;
import com.example.backend.model.Forecast;
// import com.example.backend.model.ModifiedJob;
import com.example.backend.model.BigQueryJobsPage;
import com.example.backend.model.BigQueryQueryParams;
import com.example.backend.model.QueryPage;
import com.example.backend.model.BillingQueryParams;
import com.example.backend.service.BigQueryAPICalls;
// import com.google.cloud.bigquery.Job;

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

    // Billing

    @PostMapping("/api/billing-data")
    public QueryPage<AllData> getBillingData(@RequestBody(required = false) BillingQueryParams queryParams,
            @RequestParam(required = false) String currPageNum) throws Exception {
        return bigQueryAPICalls.getBillingData(currPageNum, queryParams);
    }

    @GetMapping("/api/cost-by-month")
    public List<CostByMonth> getCostByMonth(@RequestParam(required = false) String range) throws Exception {
        return bigQueryAPICalls.getCostByMonth(range);
    }

    @GetMapping("/api/cost-by-project")
    public List<CostByProject> getCostByProject(@RequestParam(required = false) String range)
            throws Exception {
        return bigQueryAPICalls.getCostByProject(range);
    }

    @GetMapping("/api/cost-by-service")
    public List<CostByService> getCostByService(@RequestParam(required = false) String range)
            throws Exception {
        return bigQueryAPICalls.getCostByService(range);
    }

    @GetMapping("/api/cost-by-week-and-service")
    public List<CostByWeekAndService> getCostByWeekAndService(@RequestParam(required = false) String range)
            throws Exception {
        return bigQueryAPICalls.getCostByWeekAndService(range);
    }

    // BigQuery

    @PostMapping("/api/jobs-list")
    public BigQueryJobsPage getJobsList(@RequestBody(required = false) BigQueryQueryParams queryParams,
            @RequestParam(required = false) String pageToken) throws Exception {
        return bigQueryAPICalls.getJobsList(pageToken, queryParams);
    }

    // Forecast
    @PostMapping("/api/forecast")
    public QueryPage<Forecast> getForecast(@RequestBody(required = false) BillingQueryParams queryParams,
            @RequestParam(required = false) String currPageNum) throws Exception {
        return bigQueryAPICalls.getForecast(currPageNum);
    }

}
