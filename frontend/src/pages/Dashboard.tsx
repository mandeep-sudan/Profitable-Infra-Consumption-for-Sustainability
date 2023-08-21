import React, { useState } from 'react';
import { getBillingData } from '../utils/APICalls';
// import { getDataFromEndpoint } from '../../utils';
import { allDataColumns} from '../utils/TableColumns';
import BillingInfiniteTableTile from '../old/BillingInfiniteTableTile';
import GeneralInfiniteTableTile from '../components/GeneralInfiniteTableTile';
import TableTileModal from '../components/BillingTableModal/BillingTableModal';
import BillingTableModal from '../components/BillingTableModal/BillingTableModal';

const Dashboard = () => {

    // const [costByMonth, setCostByMonth] = useState<CostByMonth[]>([])
    // const [costByWeekAndService, setCostByWeekAndService] = useState<CostByWeekAndService[]>([])
    // const [costByProject, setCostByProject] = useState<CostByProject[]>([])
    const [queryParams, setQueryParams] = useState<BillingQueryParams>({matches:[],betweenDates:[],betweenValues:[],sortings:[{field:"usage_start_time",ascending:false}]});

    // useEffect(() => {
    //     getCostByWeekAndService("5-DAY").then(response => {
    //         setCostByWeekAndService(response.data);
    //     })
    // }, [])
    
    return (
        <>
        {/* <Text>Dashboard Info</Text>
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: "100%" }} className={"tile full-tile"}>
        <StaticTableTile data={costByWeekAndService} columns={costByWeekAndServiceColumns}/>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: "100%" }} className={"tile full-tile"}>
        <StackedTimeBarGraph data={costByWeekAndService} columns={costByWeekAndServiceColumns}/>
        </Card> */}

<GeneralInfiniteTableTile title={"New Full Data"} apiCall={getBillingData} columns={allDataColumns} queryParams={queryParams} modal={<BillingTableModal setQueryParams={setQueryParams}/>}/>
        
        </>
    );
}

export default Dashboard