import React, { useEffect, useState } from 'react';
import { Button, Text, Group } from '@mantine/core';
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
import { getAllData, getCostByMonth, getCostByProject, getCostByService } from '../utils/APICalls';
import { allDataModifiers, costByMonthModifiers, costByProjectModifiers, costByServiceModifiers } from '../utils/formatAndModifyData';
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
    const [allData, setAllData] = useState([])
    const [costByMonth, setCostByMonth] = useState([])
    const [costByService, setCostByService] = useState([])
    const [costByProject, setCostByProject] = useState([])

    useEffect(() => {
        getAllData("5-DAY",false).then(response => {
            // console.log(response.data);
            setAllData(response.data);
        })
        getCostByMonth("5-DAY").then(response => {
            setCostByMonth(response.data);
        })
        getCostByService("5-DAY").then(response => {
            setCostByService(response.data);
        })
        getCostByProject("5-DAY").then(response => {
            setCostByProject(response.data);
        })
    }, [])
    return (
        <>
            <TinyTile item={data[1]} stat={878} color={"red"} percentage={3.48} />
            <TinyTile item={data[2]} stat={2356} color={"orange"} percentage={-2.22} />
            <TinyTile item={data[3]} stat={90} color={"yellow"} percentage={5.29} />
            <TinyTile item={data[4]} stat={78} color={"cyan"} percentage={-1.07} />

            <TableTile title={"Full Data"} tableData={allData} modifiers={allDataModifiers} bigSize={true}/>
            <TableTile title={"Cost by Month"} tableData={costByMonth} modifiers={costByMonthModifiers} bigSize={false}/>
            <TableTile title={"Cost by Project"} tableData={costByProject} modifiers={costByProjectModifiers} bigSize={false} />
            <TableTile title={"Cost by Service"} tableData={costByService} modifiers={costByServiceModifiers} bigSize={false} />
        </>
    );
}

export default Dashboard