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
import NewTableTile from '../components/NewTableTile';
import { allDataColumns, costByMonthColumns, costByProjectColumns, costByServiceColumns } from '../utils/TableColumns';
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

const Billing = () => {
    const [allData, setAllData] = useState<AllData[]>([])
    const [costByMonth, setCostByMonth] = useState<CostByMonth[]>([])
    const [costByService, setCostByService] = useState<CostByService[]>([])
    const [costByProject, setCostByProject] = useState<CostByProject[]>([])

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
            {/* <TinyTile item={data[1]} stat={878} color={"red"} percentage={3.48} />
            <TinyTile item={data[2]} stat={2356} color={"orange"} percentage={-2.22} />
            <TinyTile item={data[3]} stat={90} color={"yellow"} percentage={5.29} />
            <TinyTile item={data[4]} stat={78} color={"cyan"} percentage={-1.07} /> */}

            <NewTableTile title={"Full Data"} data={allData} modifiers={allDataModifiers} bigSize={true} columnsHelper={allDataColumns}/>
            {/* <NewTableTile title={"Cost by Month"} data={costByMonth} modifiers={costByMonthModifiers} bigSize={false}  columnsHelper={costByServiceColumns}/> */}
            <NewTableTile title={"Cost by Project"} data={costByProject} modifiers={costByProjectModifiers} bigSize={false}  columnsHelper={costByProjectColumns}/>
            <NewTableTile title={"Cost by Service"} data={costByService} modifiers={costByServiceModifiers} bigSize={false} columnsHelper={costByServiceColumns}/>
            <NewTableTile title={"Cost by Month"} data={costByMonth} modifiers={costByMonthModifiers} bigSize={false} columnsHelper={costByMonthColumns}/>
        </>
    );
}

export default Billing