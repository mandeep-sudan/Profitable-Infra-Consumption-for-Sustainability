import React, { useEffect, useState } from 'react';
import { Button, Text, Group } from '@mantine/core';
import TinyTile from '../components/TinyTile';
import TableTile from '../components/TableTile'

import {
    IconSettings,
    IconReceipt2,
    IconWind,
    IconDashboard,
    IconDatabaseLeak,
    IconBrandGoogleBigQuery,
    IconDatabaseCog,
} from '@tabler/icons-react';
import { getAllData, getBigQueryJobsList, getCostByMonth, getCostByProject, getCostByService } from '../utils/APICalls';
import { allDataModifiers, bigQueryJobsModifiers, costByMonthModifiers, costByProjectModifiers, costByServiceModifiers } from '../utils/formatAndModifyData';
// import { getDataFromEndpoint } from '../../utils';

const BigQuery = () => {
    const [bigQueryJobsList, setBigQueryJobsList] = useState([])

    useEffect(() => {
        getBigQueryJobsList("").then(response => {
            // console.log(response.data);
            setBigQueryJobsList(response.data);
        })
    }, [])
    return (
        <>
            <TableTile title={"BigQuery Jobs"} tableData={bigQueryJobsList} modifiers={bigQueryJobsModifiers} bigSize={true}/>
        </>
    );
}

export default BigQuery