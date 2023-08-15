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
    const [costByMonth, setCostByMonth] = useState<CostByMonth[]>([])
    const [isFetchingCostByMonth, setIsFetchingCostByMonth] = useState<boolean>(true)
    
    const [costByService, setCostByService] = useState<CostByService[]>([])
    const [isFetchingCostByService, setIsFetchingCostByService] = useState<boolean>(true)

    const [isFetchingCostByProject, setIsFetchingCostByProject] = useState<boolean>(true)
    const [costByProject, setCostByProject] = useState<CostByProject[]>([])
    

    useEffect(() => {
        getCostByMonth("5-DAY").then(response => {
            setCostByMonth(response.data);
            setIsFetchingCostByMonth(false);
        })
        getCostByService("5-DAY").then(response => {
            setCostByService(response.data);
            setIsFetchingCostByService(false);
        })
        getCostByProject("5-DAY").then(response => {
            setCostByProject(response.data);
            setIsFetchingCostByProject(false);
        })
    }, [])
    return (
        <>
            {/* <TinyTile item={data[1]} stat={878} color={"red"} percentage={3.48} />
            <TinyTile item={data[2]} stat={2356} color={"orange"} percentage={-2.22} />
            <TinyTile item={data[3]} stat={90} color={"yellow"} percentage={5.29} />
            <TinyTile item={data[4]} stat={78} color={"cyan"} percentage={-1.07} /> */}
            <InfiniteTableTile title={"Full Data"} bigSize={true} apiCall={getAllData} columns={allDataColumns}/>
            
            <StaticTableTile title={"Cost by Service"} data={costByService} bigSize={false} columns={costByServiceColumns} isFetching={isFetchingCostByService}/>
            <StaticTableTile title={"Cost by Project"} data={costByProject} bigSize={false} columns={costByProjectColumns} isFetching={isFetchingCostByProject}/>
            <StaticTableTile title={"Cost by Month"} data={costByMonth} bigSize={false} columns={costByMonthColumns} isFetching={isFetchingCostByMonth}/>
        </>
    );
}

export default Billing