import React, { useEffect, useState } from 'react';

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
import TableTile from '../components/TableTile';
import { allDataColumns, costByMonthColumns, costByProjectColumns, costByServiceColumns } from '../utils/TableColumns';
import InfiniteTableTile from '../components/InfiniteTableTile';
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
        getAllData("0").then(response => {
            // console.log(response.data);
            setAllData(response.data.rowList);
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
            {/* <InfiniteTableTile title={"Infinite Full Data"} bigSize={true} columns={allDataColumns}/> */}
            <TableTile title={"Full Data"} data={allData} bigSize={true} columns={allDataColumns}/>
            <InfiniteTableTile title={"Infinite Full Data"} bigSize={true} apiCall={getAllData} columns={allDataColumns}/>
            {/* <NewTableTile title={"Cost by Month"} data={costByMonth} modifiers={costByMonthModifiers} bigSize={false}  columnsHelper={costByServiceColumns}/> */}
            <TableTile title={"Cost by Project"} data={costByProject} bigSize={false}  columns={costByProjectColumns}/>
            <TableTile title={"Cost by Service"} data={costByService} bigSize={false} columns={costByServiceColumns}/>
            <TableTile title={"Cost by Month"} data={costByMonth} bigSize={false} columns={costByMonthColumns}/>
        </>
    );
}

export default Billing