import React, { useEffect, useState } from 'react';
import { getBigQueryJobsList} from '../utils/APICalls';
import { bigQueryJobsModifiers} from '../utils/formatAndModifyData';
import TableTile from '../components/StaticTableTile';
import { bigQueryJobsListColumns } from '../utils/TableColumns';
import InfiniteTableTile from '../components/InfiniteTableTile';
import { Prism } from "@mantine/prism";
import { ScrollArea } from '@mantine/core';
import { useResizeObserver } from '@mantine/hooks';
// import { getDataFromEndpoint } from '../../utils';

const BigQuery = () => {
    // const [bigQueryJobsList, setBigQueryJobsList] = useState([])

    // useEffect(() => {
    //     getBigQueryJobsList("").then(response => {
    //         setBigQueryJobsList(response.data.rowList);
    //     })
    // }, [])
    const [ref, rect] = useResizeObserver();

    const tempStr = `WITH MyTable AS (SELECT
        project.name,
        sum(cost) as total_cost,
        SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
        total_credits,
        sum(cost) + SUM(IFNULL((SELECT SUM(c.amount) FROM UNNEST(credits) c), 0)) as
        final_cost,
        FROM
         profitable-infra-consumption.all_billing_data.gcp_billing_export_resource_v1_0124FF_8C7296_9F0D41 GROUP BY 1
        ORDER BY 1
        LIMIT
         50) SELECT TO_JSON_STRING(t) AS json FROM MyTable AS t`;

    return (
        <>
          
            <InfiniteTableTile title={"BigQuery Jobs"} bigSize={true} apiCall={getBigQueryJobsList} columns={bigQueryJobsListColumns}/>
        </>
    );
}

export default BigQuery