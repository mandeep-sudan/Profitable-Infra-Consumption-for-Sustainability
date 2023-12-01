import React, { Dispatch, SetStateAction } from "react";
import axios, { AxiosResponse } from "axios";

const baseURL: string = "http://localhost:8080/";

// Billing

export const getBillingData = (
  currPageNum: string,
  queryParams: BillingQueryParams
) => {
  const params = {
    currPageNum: currPageNum,
  };
  let endpoint: string = "api/billing-data";
  return axios.post<AllDataPage>(baseURL + endpoint, queryParams, { params });
};

export const getCostByMonth = (range: string) => {
  const params = { range: range };
  let endpoint: string = "api/cost-by-month";
  return axios.get<CostByMonth[]>(baseURL + endpoint, { params });
};

export const getCostByProject = (range: string) => {
  const params = { range: range };
  let endpoint: string = "api/cost-by-project";
  return axios.get<CostByProject[]>(baseURL + endpoint, { params });
};
export const getCostByService = (range: string) => {
  const params = { range: range };
  let endpoint: string = "api/cost-by-service";
  return axios.get<CostByService[]>(baseURL + endpoint, { params });
};

export const getCostByWeekAndService = (range: string) => {
  const params = { range: range };
  let endpoint: string = "api/cost-by-week-and-service";
  return axios.get<CostByWeekAndService[]>(baseURL + endpoint, { params });
};

// BigQuery

export const getBigQueryJobsList = (
  currPageNum: string,
  queryParams: BigQueryQueryParams
) => {
  const params = { pageToken: currPageNum };
  let endpoint: string = "api/jobs-list";
  return axios.post<BigQueryPage>(baseURL + endpoint, queryParams, { params });
};

// Forecast
export const getForecast = (
  currPageNum: string,
  queryParams: { numDays: number }
) => {
  const params = {
    currPageNum: currPageNum,
    numDays: queryParams.numDays,
  };
  let endpoint: string = "api/forecast";
  return axios.get<ForecastPage>(baseURL + endpoint, { params: params });
};

export const getForecastTimeline = (numDays: number) =>
  axios.get<ForecastTimeline[]>(baseURL + "api/forecast-timeline", {
    params: { numDays: numDays },
  });

export const getQueryFromPrompt = (prompt: string) =>
  axios.post(baseURL + "api/automl", prompt);
