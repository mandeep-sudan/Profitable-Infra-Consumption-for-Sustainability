import React,{  Dispatch, SetStateAction } from "react";
import axios from 'axios';


const baseURL : string = "http://localhost:8080/"

export const getAllData = () => {
    return axios.get(baseURL+`private-data/all-data`)
}

export const getCostByMonthData = () => {
    return axios.get(baseURL+`private-data/cost-by-month`)
}
