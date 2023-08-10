import React,{  Dispatch, SetStateAction } from "react";
import axios, { AxiosResponse } from 'axios';


const baseURL : string = "http://localhost:8080/"

export const getAllData = (range:string,allColumns:boolean) =>  {
    const params = {range : range,allColumns:allColumns}
    let endpoint : string = "api/all-data"
    return axios.get<AllData[]>(baseURL+endpoint,{params})
}

export const getCostByMonth = (range:string) => {
    const params = {range : range}
    let endpoint : string = "api/cost-by-month"
    return axios.get<CostByMonth[]>(baseURL+endpoint,{params})
}

export const getCostByProject = (range:string) => {
    const params = {range : range}
    let endpoint : string = "api/cost-by-project"
    return axios.get<CostByProject[]>(baseURL+endpoint,{params})
}
export const getCostByService = (range:string) => {
    const params = {range : range}
    let endpoint : string = "api/cost-by-service"
    return axios.get<CostByService[]>(baseURL+endpoint,{params})
}

export const getBigQueryJobsList2 = (range:string) => {
    let endpoint : string = "api/jobs-list"
    return axios.get<BigQueryJob[]>(baseURL+endpoint)
}

export const getBigQueryJobsList = (pageToken:string) => {
    const params = {pageToken : pageToken}
    let endpoint : string = "api/jobs-list2"
    return axios.get<BigQueryPage>(baseURL+endpoint,{params})
}
