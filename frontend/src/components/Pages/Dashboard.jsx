import { useState } from 'react';
import TableTile from '../Tiles/TableTile';
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
    // Jobs you monitor
    const jobsMonitorHeader = ["Job Name","Job Link","Log Link","Start Time","End Time","Status"]
    const jobsMonitorRows = ["dfdw-ingestion-dfdm",
                                    "2022-04-11_03_45_56-175342343243423434",
                                    "Log Link", 
                                    "2022-04-11T09:08:04.3434444",
                                    "2023-06-11T09:08:04.3434444",
                                    <Button size="xs" color="green">Success</Button>]
    // Audit logs
    const auditLogsHeader = ["Job ID","Job Detail ID","Process Name","Source Name","Target Table Name","Source Count","Target Count",,"Error Count","Reject Count","Processed Time","Status"]
    const auditLogsRows = ["9001",
                            "2022-04-11_03_45_56-175342343243423434",
                            "dfdm-cedsp-stars",
                            "prj-dfdl-75-stars-p-75.bq_dsp_common_fdp.gbdldsp08_audit",
                            "prj-dfdm-75-cedsp-p-75.bq_dsp_common_fdp.gbdldsp08_audit",
                            "345556",
                            "345556",
                            "0",
                            "0",
                            "2022-04-11T09:08:04.3434444",
                            <Button size="xs" color="green">Success</Button>]
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
        <TinyTile item={data[1]} stat={878} color={"red"} other={increase}/>
        <TinyTile item={data[2]} stat={2356} color={"orange"} other={decrease}/>
        <TinyTile item={data[3]} stat={90} color={"yellow"} other={increase}/>
        <TinyTile item={data[4]} stat={78} color={"cyan"} other={decrease}/>
        
        <TableTile title={"Jobs you Monitor"} tableRows={jobsMonitorRows} tableHeader={jobsMonitorHeader}/>
        <TableTile title={"Audit Logs"} tableRows={auditLogsRows} tableHeader={auditLogsHeader}/>
        </>
    );
}

export default Dashboard