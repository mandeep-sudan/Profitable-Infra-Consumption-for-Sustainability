import React, { useEffect, useState } from 'react';
import { getCostByMonth, getCostByProject, getCostByService } from '../utils/APICalls';
// import { getDataFromEndpoint } from '../../utils';
import StaticBarGraph from '../components/StaticBarGraph';
import StaticGraphAndTableTile from '../components/StaticBarGraphAndTableTile';
import { costByMonthColumns, costByProjectColumns, costByServiceColumns } from '../utils/TableColumns';

const stringsToAxesClass = (xKey:string,xLabel:string,yKey:string,yLabel:string) : AxesKeysAndLabels => {
    return { x: { key: xKey, label: xLabel }, y: { key: yKey, label: yLabel } }
}

const Dashboard = () => {
    const costByServiceAxes : AxesKeysAndLabels = stringsToAxesClass("description","Service","totalCost","Total Cost")
    const costByProjectAxes : AxesKeysAndLabels = stringsToAxesClass("name","Project","totalCost","Total Cost")
    const costByMonthAxes : AxesKeysAndLabels = stringsToAxesClass("month","Month","totalCost","Total Cost")
    
    const [costByMonth, setCostByMonth] = useState<CostByMonth[]>([])
    // const [isFetchingCostByMonth, setIsFetchingCostByMonth] = useState<boolean>(true)
    
    const [costByService, setCostByService] = useState<CostByService[]>([])


    const [costByProject, setCostByProject] = useState<CostByProject[]>([])
    

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
            <StaticGraphAndTableTile title={"Cost By Month"} data={costByMonth} columns={costByMonthColumns} axesKeysAndLabels={costByMonthAxes} bigSize={false}/>
            <StaticGraphAndTableTile title={"Cost By Project"} data={costByProject} columns={costByProjectColumns} axesKeysAndLabels={costByProjectAxes} bigSize={false}/>
            <StaticGraphAndTableTile title={"Cost By Service"} data={costByService} columns={costByServiceColumns} axesKeysAndLabels={costByServiceAxes} bigSize={false}/>
        </>
    );
}

export default Dashboard