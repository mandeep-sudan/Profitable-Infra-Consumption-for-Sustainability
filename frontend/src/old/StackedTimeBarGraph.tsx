import React, { Fragment, PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';
import './Example.css'
import { Text, Card, Title } from '@mantine/core';
import { AxiosResponse } from 'axios';

type StackedTimeBarGraphProps = {
    data: ICostByWeekAndSomething[]
    axesKeysAndLabels: AxesKeysAndLabels
}

const modifyDataFormat = (data: ICostByWeekAndSomething[]) : [Record<string, any>[],React.ReactElement] => {
    let newData: Record<string, any>[] = []
    let names : string[] = []
    
    if (data.length === 0) {
        return [newData,<></>];
    }
    
    let currDate: string = ""
    let currDict: Record<string, any> = {} // TO DO: maybe try to narrow down the type

    for (let i = 0; i < data.length; i++) {
        if (!names.includes(data[i].name)) {
            names.push(data[i].name)
        }
        if (data[i].week === currDate) {
            currDict[data[i].name] = data[i].totalCost
        } else {
            newData.push(currDict)
            currDate = data[i].week
            currDict = {}
            currDict["week"] = data[i].week
        }
    }

    // console.log(tableHeader)
    let modifiedTableHeader : React.ReactElement[] = names.map((colName:string) => {
        return (
            <Bar dataKey={colName} name={colName} fill="#40c057" />
        )
    })

    let barNames: React.ReactElement = <Fragment>
        {modifiedTableHeader}
    </Fragment>

    return [newData,barNames]
}

const StackedTimeBarGraph = ({ data, axesKeysAndLabels }: StackedTimeBarGraphProps) => {

    return (

        <div style={{ width: "100%", height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={400}
                    data={modifyDataFormat(data)}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 50,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={axesKeysAndLabels.x.key}
                        label={{ value: axesKeysAndLabels.x.label, position: 'insideBottom', offset: -30 }} />
                    <YAxis label={{ value: axesKeysAndLabels.y.label, angle: -90, position: 'insideLeft' }} />
                    {/* <YAxis className='textWithFont' /> */}
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <Brush dataKey="name" height={30} stroke="#8884d8" />
                    {/* <Legend className='textWithFont' /> */}
                    {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" /> */}
                    <Bar dataKey={axesKeysAndLabels.y.key} name={axesKeysAndLabels.y.label} fill="#40c057" />
                    <Bar dataKey={axesKeysAndLabels.y.key} name={axesKeysAndLabels.y.label} fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StackedTimeBarGraph;