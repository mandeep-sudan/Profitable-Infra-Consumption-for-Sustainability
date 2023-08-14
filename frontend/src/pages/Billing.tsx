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
import StaticTableTile from '../components/StaticTableTile';
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
    // const [allData, setAllData] = useState<AllData[]>([])
    // const [costByMonth, setCostByMonth] = useState<CostByMonth[]>([])
    // const [costByService, setCostByService] = useState<CostByService[]>([])
    // const [costByProject, setCostByProject] = useState<CostByProject[]>([])

    // useEffect(() => {
    //     getAllData("0").then(response => {
    //         // console.log(response.data);
    //         setAllData(response.data.rowList);
    //     })
    //     getCostByMonth("5-DAY").then(response => {
    //         setCostByMonth(response.data);
    //     })
    //     getCostByService("5-DAY").then(response => {
    //         setCostByService(response.data);
    //     })
    //     getCostByProject("5-DAY").then(response => {
    //         setCostByProject(response.data);
    //     })
    // }, [])
    return (
        <>
            {/* <TinyTile item={data[1]} stat={878} color={"red"} percentage={3.48} />
            <TinyTile item={data[2]} stat={2356} color={"orange"} percentage={-2.22} />
            <TinyTile item={data[3]} stat={90} color={"yellow"} percentage={5.29} />
            <TinyTile item={data[4]} stat={78} color={"cyan"} percentage={-1.07} /> */}
            <InfiniteTableTile title={"Full Data"} bigSize={true} apiCall={getAllData} columns={allDataColumns}/>
            
            <StaticTableTile title={"Cost by Service"} bigSize={false} apiCall={getCostByService}  apiStr={"5-DAY"} columns={costByServiceColumns}/>
            <StaticTableTile title={"Cost by Project"} bigSize={false} apiCall={getCostByProject} apiStr={"5-DAY"} columns={costByProjectColumns}/>
            <StaticTableTile title={"Cost by Month"} bigSize={false} apiCall={getCostByMonth}  apiStr={"5-DAY"} columns={costByMonthColumns}/>
        </>
    );
}

export default Billing