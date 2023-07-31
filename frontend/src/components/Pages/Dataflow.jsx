import { useState } from 'react';
import TableTileReal from '../Tiles/TableTileReal';
import { Button,Text,Group } from '@mantine/core';
import TinyTile from '../Tiles/TinyTile';

import {
    IconSettings,
    IconReceipt2,
    IconWind,
    IconDashboard,
    IconDatabaseLeak,
    IconBrandGoogleBigQuery,
    IconDatabaseCog,
    IconArrowNarrowUp,
    IconArrowNarrowDown,
    IconCheck,
    IconX,
    IconSum,
    IconRun,
  } from '@tabler/icons-react';

  
const data = [
    { link: '', label: 'Total', icon: IconSum },
    { link: '', label: 'Success', icon: IconCheck },
    { link: '', label: 'Failed', icon: IconX },
    { link: '', label: 'Running', icon: IconRun },
];

const Dashboard = () => {
    // Dataflow Jobs History prep
    const dataflowJobsHistoryHeader = ["Task", "Job Name", "Job Id", "Runtime", "Start Time", "End Time", "Status", "Cost"]
    const dataflowJobsHistoryRows = [<Button size="xs" radius="sm">Add to Task</Button>,
                                    "dfdm-cedsp-stars-20230627210051676-4c79d3f4",
                                    "2023-06-27_14_04_22-17910625415729865476",
                                    "00:03:34", 
                                    "2023-06-11T09:08:04.3434444",
                                    "2023-06-11T09:08:04.3434444",
                                    "Success",
                                    "$9.889"]
    // Long Running Jobs
    const longRunningJobsHeader = ["Dataflow Job Name", "Dataflow Job ID", "Runtime", "Duration", "Cost"]
    const longRunningJobsRows = ["dfdw-ingestion-dfdm",
                                    "2022-04-11_03_45_56-175342343243423434	",
                                    "2022-04-11T09:08:04.3434444",
                                    "00:03:34",
                                    "$9.889"]
    // Increase or decrease for tiny tiles
    const increase = <Group spacing="xs" style={{marginTop: "10px"}}>
                        <Group spacing="0">
                            <IconArrowNarrowUp color="green"/>
                            <Text fz="sm" color="green">3.48%</Text>
                        </Group>
                        
                        <Text fz="sm" color="dimmed">Since last month</Text>
                    </Group>
    const decrease = <Group spacing="xs" style={{marginTop: "10px"}}>
                    <Group spacing="0">
                        <IconArrowNarrowDown color="red"/>
                        <Text fz="sm" color="red">3.48%</Text>
                    </Group>
                    
                    <Text fz="sm" color="dimmed">Since last month</Text>
                </Group>
    return (
        <>
        <Text>Dataflow Information</Text>
        {/* <TinyTile item={data[0]} stat={33} color={"yellow"}/>
        <TinyTile item={data[1]} stat={29} color={"green"}/>
        <TinyTile item={data[2]} stat={3} color={"red"}/>
        <TinyTile item={data[3]} stat={1} color={"cyan"}/>
        
        <TableTile title={"Dataflow Jobs History"} tableRows={dataflowJobsHistoryRows} tableHeader={dataflowJobsHistoryHeader}/>
        <TableTile title={"Long Running Jobs"} tableRows={longRunningJobsRows} tableHeader={longRunningJobsHeader}/> */}
        </>
    );
}

export default Dashboard