import React, { Dispatch, SetStateAction } from "react";
import axios, { AxiosResponse } from 'axios';


const baseURL: string = "http://localhost:8080/"

export const getAllDataNew = (currPageNum: string, queryParams: BillingQueryParams) => {
    const params = {
        currPageNum: currPageNum
    }
    console.log(params)
    let endpoint: string = "api/all-data-new"
    return axios.post<AllDataPage>(baseURL + endpoint, queryParams, { params })
}

export const getAllData = (currPageNum: string) => {
    const params = { currPageNum: currPageNum }
    let endpoint: string = "api/all-data"
    return axios.get<AllDataPage>(baseURL + endpoint, { params })
}

export const getCostByMonth = (range: string) => {
    const params = { range: range }
    let endpoint: string = "api/cost-by-month"
    return axios.get<CostByMonth[]>(baseURL + endpoint, { params })
}

export const getCostByProject = (range: string) => {
    const params = { range: range }
    let endpoint: string = "api/cost-by-project"
    return axios.get<CostByProject[]>(baseURL + endpoint, { params })
}
export const getCostByService = (range: string) => {
    const params = { range: range }
    let endpoint: string = "api/cost-by-service"
    return axios.get<CostByService[]>(baseURL + endpoint, { params })
}

export const getCostByWeekAndService = (range: string) => {
    const params = { range: range }
    let endpoint: string = "api/cost-by-week-and-service"
    return axios.get<CostByWeekAndService[]>(baseURL + endpoint, { params })
}

export const getBigQueryJobsList = (pageToken: string) => {
    const params = { pageToken: pageToken }
    let endpoint: string = "api/jobs-list"
    return axios.get<BigQueryPage>(baseURL + endpoint, { params })
}
