import React, { useEffect, useState } from 'react';
import { bigQueryJobsListColumns } from '../utils/TableColumns';
import InfiniteTableTile from '../components/InfiniteTableTile';
import BigQueryTableModal from '../components/BigQueryTableModal/BigQueryTableModal';
import { Text } from '@mantine/core';
import { getBigQueryJobsList } from '../utils/APICalls';

const BigQuery = () => {
    const [queryParams, setQueryParams] = useState<BigQueryQueryParams>({
        allUsers: false,
        minCreationTime: "",
        maxCreationTime: "",
        parentJobId: "",
        stateFilters: ["DONE","PENDING","RUNNING"]
    })
    return (
        <>
            <InfiniteTableTile title={"BigQuery Jobs Data"} apiCall={getBigQueryJobsList} columns={bigQueryJobsListColumns} queryParams={queryParams} modal={<BigQueryTableModal setQueryParams={setQueryParams} />} />
            {/* <Text>{JSON.stringify(queryParams)}</Text> */}
        </>
    );
}

export default BigQuery