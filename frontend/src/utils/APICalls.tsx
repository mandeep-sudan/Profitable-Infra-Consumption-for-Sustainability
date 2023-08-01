import React,{  Dispatch, SetStateAction } from "react";
import axios from 'axios';


const baseURL : string = "http://localhost:8080/"

export const getAllData = (range:string,allColumns:boolean) =>  {
    let endpoint : string = "api/all-data"
    let queries : string
    if (range === "") {
        queries = "?allColumns="+allColumns
    } else {
        queries = "?range="+range+"&allColumns="+allColumns
    }
    return axios.get(baseURL+endpoint+queries)
}

export const getCostByMonth = (range:string) => {
    let endpoint : string = "api/cost-by-month"
    let queries : string
    if (range === "") {
        queries = ""
    } else {
        queries = "?range="+range
    }
    return axios.get(baseURL+endpoint+queries)
}

export const getCostByProject = (range:string) => {
    let endpoint : string = "api/cost-by-project"
    let queries : string
    if (range === "") {
        queries = ""
    } else {
        queries = "?range="+range
    }
    return axios.get(baseURL+endpoint+queries)
}
export const getCostByService = (range:string) => {
    let endpoint : string = "api/cost-by-service"
    let queries : string
    if (range === "") {
        queries = ""
    } else {
        queries = "?range="+range
    }
    return axios.get(baseURL+endpoint+queries)
}