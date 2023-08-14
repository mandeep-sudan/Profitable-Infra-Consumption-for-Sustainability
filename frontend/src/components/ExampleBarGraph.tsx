import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Example.css'
import { Text, Card, Title } from '@mantine/core';
import { AxiosResponse } from 'axios';

const oldData = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

type BarGraphProps<T> = {
    title: string
    apiCall: (pageToken: string) => Promise<AxiosResponse<T[], any>>
    apiStr: string
    axesKeysAndLabels: AxesKeysAndLabels
}

const ExampleBarGraph = <T,>({ title, apiCall, apiStr, axesKeysAndLabels}: BarGraphProps<T>) => {
    const [data, setData] = useState<T[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);

    useEffect(() => {
        apiCall(apiStr).then(response => {
            setData(response.data)
            setIsFetching(false)
        })
    }, [])

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: "100%" }}>
            <Title order={2} style={{ padding: "10px" }}>{title}</Title>
            {/* <div style={{ width: "100%", height: "400px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={oldData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" className='textWithFont' />
                        <YAxis className='textWithFont' />
                        <Tooltip labelClassName='textWithFont' />
                        <Legend className='textWithFont' />
                        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div> */}
            <div style={{ width: "100%", height: "400px" }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={400}
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 50,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={axesKeysAndLabels.x.key}  className='textWithFont' 
                        label={{ value: axesKeysAndLabels.x.label, position: 'insideBottom' ,offset:-30 }}/>
                        <YAxis label={{ value: axesKeysAndLabels.y.label, angle: -90, position: 'insideLeft' }} />
                        {/* <YAxis className='textWithFont' /> */}
                        <Tooltip labelClassName='textWithFont' />
                        {/* <Legend className='textWithFont' /> */}
                        {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" /> */}
                        <Bar dataKey={axesKeysAndLabels.y.key} name={axesKeysAndLabels.y.label} fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}

export default ExampleBarGraph;