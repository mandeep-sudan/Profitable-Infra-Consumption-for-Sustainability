package com.example.backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
// import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.model.AllData;
import com.example.backend.model.CostByMonth;
import com.example.backend.model.CostByProject;
import com.example.backend.model.CostByService;
import com.example.backend.model.ModifiedJob;
import com.example.backend.model.ModifiedPage;
import com.example.backend.model.QueryPage;
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

    // PUBLIC
    // @GetMapping("/public-data/all-data")
    // public String getAllPublicData() throws Exception {
    // // gets full table data for publically available data (up to 100 jobs)
    // return bigQueryAPICalls.getAllPublicData();
    // }

    // @GetMapping("/public-data/cost-by-month")
    // public String getPublicDataByMonth() throws Exception {
    // return bigQueryAPICalls.getPublicDataByMonth();
    // }

    // @GetMapping("/private-data/cost-for-gcp")
    // public String getCostPricingExportPrivate() throws Exception {
    // return bigQueryAPICalls.getCostPricingExportPrivate();
    // }

    @GetMapping("/api/all-data")
    public QueryPage<AllData> getAllData(@RequestParam(required = false) String range,
                                    @RequestParam(required = false) String currPageNum) throws Exception {
        return bigQueryAPICalls.getAllData(range,currPageNum);
    }

    // @GetMapping("/api/all-data")
    // public String getAllData(@RequestParam(required = false) String range,
    // @RequestParam(required = false) Boolean allColumns) throws Exception {
    // if (allColumns) {
    // return bigQueryAPICalls.getAllData(range);
    // }
    // return bigQueryAPICalls.getImportantColumns(range);
    // }

    @GetMapping("/api/cost-by-month")
    public List<CostByMonth> getCostByMonth(@RequestParam(required = false) String range) throws Exception {
        return bigQueryAPICalls.getCostByMonth(range);
    }

    @GetMapping("/api/cost-by-project")
    public List<CostByProject> getCostByProject(@RequestParam(required = false) String range)
            throws Exception {
        return bigQueryAPICalls.getCostByProject(range);
    }

    // @GetMapping("/api/cost-by-project-new")
    // public List<FieldValueList> getCostByProjectNew(@RequestParam(required =
    // false) String range) throws Exception {
    // return bigQueryAPICalls.getCostByProjectNew(range);
    // }

    @GetMapping("/api/cost-by-service")
    public List<CostByService> getCostByService(@RequestParam(required = false) String range)
            throws Exception {
        return bigQueryAPICalls.getCostByService(range);
    }

    @GetMapping("/api/jobs-list")
    public ModifiedPage getJobsList(@RequestParam(required = false) String pageToken)
            throws Exception {
        return bigQueryAPICalls.getJobsList(pageToken);
    }

}
