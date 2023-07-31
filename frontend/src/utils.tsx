import React,{ useState,useEffect, Dispatch, SetStateAction } from "react";
import axios from 'axios';



type getDataFromEndpointProps = {
    endpoint:string,
    setFullData:Dispatch<SetStateAction<any>>,
    setFullDataHeader:Dispatch<SetStateAction<any>>
  }

export const getDataFromEndpoint = ({endpoint,setFullData,setFullDataHeader} : getDataFromEndpointProps) => {
    const URL = "http://localhost:8080/" + endpoint;
    console.log(endpoint)
    useEffect (() => {
        axios.get(URL)
        .then(response => {
            setFullData(response.data);
            setFullDataHeader(Object.keys(response.data[0]))
        }).catch(error => console.log(error))
    })
}