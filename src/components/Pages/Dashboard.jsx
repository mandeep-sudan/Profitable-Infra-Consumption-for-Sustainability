import { useState } from 'react';
import TableTile from '../Tiles/TableTile';
import { Button } from '@mantine/core';
import TinyTile from '../Tiles/TinyTile';

import {
    IconSettings,
    IconReceipt2,
    IconWind,
    IconDashboard,
    IconDatabaseLeak,
    IconBrandGoogleBigQuery,
    IconDatabaseCog,
  } from '@tabler/icons-react';

  
const data = [
    { link: '', label: 'Dashboard', icon: IconDashboard },
    { link: '', label: 'Dataflow', icon: IconDatabaseLeak },
    { link: '', label: 'Airflow', icon: IconWind },
    { link: '', label: 'BigQuery', icon: IconBrandGoogleBigQuery },
    { link: '', label: 'DataProc', icon: IconDatabaseCog },
    { link: '', label: 'Billing', icon: IconReceipt2 },
    { link: '', label: 'Other Settings', icon: IconSettings },
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
    return (
        <>
        <TinyTile item={data[1]} stat={878} color={"red"}/>
        <TinyTile item={data[2]} stat={2356} color={"orange"}/>
        <TinyTile item={data[3]} stat={90} color={"yellow"}/>
        <TinyTile item={data[4]} stat={78} color={"cyan"}/>
        
        <TableTile title={"Dataflow Jobs History"} tableRows={dataflowJobsHistoryRows} tableHeader={dataflowJobsHistoryHeader}/>
        </>
    );
}

export default Dashboard