import React from 'react';
import { getAllData } from '../utils/APICalls';
// import { getDataFromEndpoint } from '../../utils';
import { allDataColumns} from '../utils/TableColumns';
import NewInfiniteTableTile from '../components/NewInfiniteTableTile';

const Dashboard = () => {

    // const [costByMonth, setCostByMonth] = useState<CostByMonth[]>([])
    // const [costByWeekAndService, setCostByWeekAndService] = useState<CostByWeekAndService[]>([])
    // const [costByProject, setCostByProject] = useState<CostByProject[]>([])
    

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

        <NewInfiniteTableTile title={"New Full Data"} bigSize={true} apiCall={getAllData} columns={allDataColumns}/>
        
        </>
    );
}

export default Dashboard