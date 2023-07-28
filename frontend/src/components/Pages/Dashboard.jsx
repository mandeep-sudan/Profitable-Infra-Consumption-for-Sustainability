import { useEffect, useState } from 'react';
import TableTile from '../Tiles/TableTile';
import { Button,Text,Group } from '@mantine/core';
import TinyTile from '../Tiles/TinyTile';
import axios from 'axios';

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
// import { getDataFromEndpoint } from '../../utils';
import TableTileReal from '../Tiles/TableTileReal';

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
    // FULL DATA
    const [fullDataHeader, setFullDataHeader] = useState([])
    const [fullData, setFullData] = useState([])

    const [costByMonthHeader, setCostByMonthHeader] = useState([])
    const [costByMonthData, setCostByMonthData] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:8080/private-data/all-data`)
        .then(response => {
            console.log("success all-data");
            setFullData(response.data);
            setFullDataHeader(Object.keys(response.data[0]));
        })
        axios.get(`http://localhost:8080/private-data/cost-by-month`)
        .then(response => {
            console.log("success cost-by-month");
            setCostByMonthData(response.data);
            setCostByMonthHeader(Object.keys(response.data[0]));
        })
    })

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
        {/* <TinyTile item={data[1]} stat={878} color={"red"} other={increase}/>
        <TinyTile item={data[2]} stat={2356} color={"orange"} other={decrease}/>
        <TinyTile item={data[3]} stat={90} color={"yellow"} other={increase}/>
        <TinyTile item={data[4]} stat={78} color={"cyan"} other={decrease}/> */}
        
        <TableTileReal title={"Full Data"} tableRows={fullData} tableHeader={fullDataHeader}/>
        <TableTileReal title={"Cost by Month"} tableRows={costByMonthData} tableHeader={costByMonthHeader}/>
        </>
    );
}

export default Dashboard