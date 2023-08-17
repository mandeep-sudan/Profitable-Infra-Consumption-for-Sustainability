import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Example.css'
import { Text, Card, Title } from '@mantine/core';
import { AxiosResponse } from 'axios';

type BarGraphProps<T> = {
    data:T[]
    axesKeysAndLabels: AxesKeysAndLabels
}

const StaticBarGraph = <T,>({ data, axesKeysAndLabels}: BarGraphProps<T>) => {

    return (
        
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
                        <XAxis dataKey={axesKeysAndLabels.x.key}
                        label={{ value: axesKeysAndLabels.x.label, position: 'insideBottom' ,offset:-30 }}/>
                        <YAxis label={{ value: axesKeysAndLabels.y.label, angle: -90, position: 'insideLeft' }} />
                        {/* <YAxis className='textWithFont' /> */}
                        <Tooltip labelClassName='textWithFont' />
                        {/* <Legend className='textWithFont' /> */}
                        {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" /> */}
                        <Bar dataKey={axesKeysAndLabels.y.key} name={axesKeysAndLabels.y.label} fill="#40c057" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
    );
}

export default StaticBarGraph;