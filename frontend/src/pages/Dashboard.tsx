import React, { useEffect, useState } from 'react';
import { getBigQueryJobsList, getCostByMonth, getCostByProject, getCostByService } from '../utils/APICalls';
import { bigQueryJobsListColumns } from '../utils/TableColumns';
import InfiniteTableTile from '../components/InfiniteTableTile';
// import { getDataFromEndpoint } from '../../utils';
import ExampleBarGraph from '../components/ExampleBarGraph';
import { Card, Text } from '@mantine/core';

const stringsToAxesClass = (xKey:string,xLabel:string,yKey:string,yLabel:string) : AxesKeysAndLabels => {
    return { x: { key: xKey, label: xLabel }, y: { key: yKey, label: yLabel } }
}

const Dashboard = () => {

    // const [costByMonth, setCostByMonth] = useState<CostByMonth[]>([])
    // const [costByService, setCostByService] = useState<CostByService[]>([])
    // const [costByProject, setCostByProject] = useState<CostByProject[]>([])

    // useEffect(() => {
    //     getCostByMonth("5-DAY").then(response => {
    //         setCostByMonth(response.data);
            
    //     })
    //     getCostByService("5-DAY").then(response => {
    //         setCostByService(response.data);
    //         console.log(response.data)
    //     })
    //     getCostByProject("5-DAY").then(response => {
    //         setCostByProject(response.data);
    //     })
    // }, [])

    const costByServiceAxes : AxesKeysAndLabels = stringsToAxesClass("description","Service","totalCost","Total Cost")
    const costByProjectAxes : AxesKeysAndLabels = stringsToAxesClass("name","Project","totalCost","Total Cost")
    
    return (
        <>
            <ExampleBarGraph title={"Cost By Service"} apiCall={getCostByService} apiStr={"5-DAY"} axesKeysAndLabels={costByServiceAxes}/>
            <ExampleBarGraph title={"Cost By Project"} apiCall={getCostByProject} apiStr={"5-DAY"} axesKeysAndLabels={costByProjectAxes}/>
            
        </>
    );
}

export default Dashboard