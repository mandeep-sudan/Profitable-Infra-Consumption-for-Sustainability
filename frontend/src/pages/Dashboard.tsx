import React, { useEffect, useState } from 'react';
import { getCostByProject, getCostByService } from '../utils/APICalls';
// import { getDataFromEndpoint } from '../../utils';
import ExampleBarGraph from '../components/ExampleBarGraph';

const stringsToAxesClass = (xKey:string,xLabel:string,yKey:string,yLabel:string) : AxesKeysAndLabels => {
    return { x: { key: xKey, label: xLabel }, y: { key: yKey, label: yLabel } }
}

const Dashboard = () => {
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