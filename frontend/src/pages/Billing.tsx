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
import { getBillingData, getCostByMonth, getCostByProject, getCostByService } from '../utils/APICalls';
import { allDataColumns, costByMonthColumns, costByProjectColumns, costByServiceColumns } from '../utils/TableColumns';
import OldInfiniteTableTile from '../components/OldInfiniteTableTile';
import StaticBarGraphAndTableTile from '../components/StaticBarGraphAndTableTile';
import { stringsToAxesClass } from '../utils/utils';
import NewInfiniteTableTile from '../old/BillingInfiniteTableTile';
import GeneralInfiniteTableTile from '../components/GeneralInfiniteTableTile';
import BillingTableModal from '../components/BillingTableModal/BillingTableModal';
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
    const costByServiceAxes : AxesKeysAndLabels = stringsToAxesClass("name","Service","totalCost","Total Cost")
    const costByProjectAxes : AxesKeysAndLabels = stringsToAxesClass("name","Project","totalCost","Total Cost")
    const costByMonthAxes : AxesKeysAndLabels = stringsToAxesClass("name","Month","totalCost","Total Cost")
    
    const [costByMonth, setCostByMonth] = useState<CostByMonth[]>([])
    const [costByService, setCostByService] = useState<CostByService[]>([])
    const [costByProject, setCostByProject] = useState<CostByProject[]>([])
    
    const [queryParams, setQueryParams] = useState<BillingQueryParams>({matches:[],betweenDates:[],betweenValues:[],sortings:[{field:"usage_start_time",ascending:false}]});

    useEffect(() => {
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
            {/* <NewInfiniteTableTile title={"New Full Data"} bigSize={true} apiCall={getAllData} columns={allDataColumns}/> */}
            {/* <OldInfiniteTableTile title={"Full Data"} bigSize={true} apiCall={getAllData} columns={allDataColumns}/> */}
            <GeneralInfiniteTableTile title={"New Full Data"} apiCall={getBillingData} columns={allDataColumns} queryParams={queryParams} modal={<BillingTableModal setQueryParams={setQueryParams}/>}/>
            <StaticBarGraphAndTableTile title={"Cost By Month"} data={costByMonth} columns={costByMonthColumns} axesKeysAndLabels={costByMonthAxes} bigSize={false}/>
            <StaticBarGraphAndTableTile title={"Cost By Project"} data={costByProject} columns={costByProjectColumns} axesKeysAndLabels={costByProjectAxes} bigSize={false}/>
            <StaticBarGraphAndTableTile title={"Cost By Service"} data={costByService} columns={costByServiceColumns} axesKeysAndLabels={costByServiceAxes} bigSize={false}/>
        </>
    );
}

export default Billing