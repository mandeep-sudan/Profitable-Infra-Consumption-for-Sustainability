import React,{ useEffect, useState } from 'react';
import { Button,Text,Group } from '@mantine/core';
import TinyTile from '../components/TinyTile';
import TableTile from '../components/TableTile'

import {
    IconSettings,
    IconReceipt2,
    IconWind,
    IconDashboard,
    IconDatabaseLeak,
    IconBrandGoogleBigQuery,
    IconDatabaseCog,
  } from '@tabler/icons-react';
import { getAllData, getCostByMonthData } from '../utils/APICalls';
import { stringToReadableDate } from '../utils/functions';
// import { getDataFromEndpoint } from '../../utils';

const data = [
    { link: '', label: 'Dashboard', icon: IconDashboard },
    { link: '', label: 'Dataflow', icon: IconDatabaseLeak },
    { link: '', label: 'Airflow', icon: IconWind },
    { link: '', label: 'BigQuery', icon: IconBrandGoogleBigQuery },
    { link: '', label: 'DataProc', icon: IconDatabaseCog },
    { link: '', label: 'Billing', icon: IconReceipt2 },
    { link: '', label: 'Other Settings', icon: IconSettings },
];

const getServiceField = (stringJSON : any) => {
    return stringJSON.description;
}

const fullDataHeadersAndModifiers = {
    "billing_account_id":"",
    "service":3,
    // "sku",
    // "usage_start_time",
    // "usage_end_time",
    // "project",
    // "labels",
    // "system_labels",
    // "location",
    // "tags",
    // "transaction_type",
    // "seller_name",
    // "export_time",
    // "cost",
    // "currency",
    // "currency_conversion_rate",
    // "usage",
    // "credits",
    // "invoice",
    // "cost_type",
    // "adjustment_info",
    // "cost_at_list"
};

const Dashboard = () => {
    const [fullData, setFullData] = useState([])



    const [costByMonthData, setCostByMonthData] = useState([])

    useEffect(() => {
        getAllData().then(response => {
            setFullData(response.data);
        })
        getCostByMonthData().then(response => {
            setCostByMonthData(response.data);
        })
    },[])
    return (
        <>
        <TinyTile item={data[1]} stat={878} color={"red"}  percentage={3.48}/>
        <TinyTile item={data[2]} stat={2356} color={"orange"} percentage={-2.22}/>
        <TinyTile item={data[3]} stat={90} color={"yellow"}  percentage={5.29}/>
        <TinyTile item={data[4]} stat={78} color={"cyan"}  percentage={-1.07}/>
        
        <TableTile title={"Full Data"} tableData={fullData} headersAndModifiers={fullDataHeadersAndModifiers}/>
        <TableTile title={"Cost by Month"} tableData={costByMonthData} headersAndModifiers={""}/>
        </>
    );
}

export default Dashboard