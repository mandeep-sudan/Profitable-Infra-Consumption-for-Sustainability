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
    IconArrowNarrowUp,
    IconArrowNarrowDown,
  } from '@tabler/icons-react';
import { getAllData, getCostByMonthData } from '../api/APICalls';
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

    // Increase or decrease for tiny tiles
    const increase = <Group spacing="xs" style={{marginTop: "10px"}}>
                        <Group spacing="0">
                            <IconArrowNarrowUp color="green"/>
                            <Text fz="sm" color="green">3.48%</Text>
                        </Group>
                        
                        <Text fz="sm" color="dimmed">Since last month</Text>
                    </Group>
    const decrease = <Group spacing="xs" style={{marginTop: "10px"}}>
                    <Group spacing="0">
                        <IconArrowNarrowDown color="red"/>
                        <Text fz="sm" color="red">3.48%</Text>
                    </Group>
                    
                    <Text fz="sm" color="dimmed">Since last month</Text>
                </Group>
    return (
        <>
        <TinyTile item={data[1]} stat={878} color={"red"}  percentage={3.48}/>
        <TinyTile item={data[2]} stat={2356} color={"orange"} percentage={-2.22}/>
        <TinyTile item={data[3]} stat={90} color={"yellow"}  percentage={5.29}/>
        <TinyTile item={data[4]} stat={78} color={"cyan"}  percentage={-1.07}/>
        
        <TableTile title={"Full Data"} tableData={fullData}/>
        <TableTile title={"Cost by Month"} tableData={costByMonthData}/>
        </>
    );
}

export default Dashboard