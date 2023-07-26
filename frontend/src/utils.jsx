import { useState,useEffect } from "react";
import React from 'react';
import axios from 'axios';

export const getDataFromEndpoint = ({endpoint,setFullData,setFullDataHeader}) => {
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