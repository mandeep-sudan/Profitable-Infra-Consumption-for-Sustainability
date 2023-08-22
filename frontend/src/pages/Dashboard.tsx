import React from 'react';
import { Text } from '@mantine/core';
import BigQueryTableModal from '../components/BigQueryTableModal/BigQueryTableModal';
import { useSetState } from '@mantine/hooks';
import InfiniteTableTile from '../components/InfiniteTableTile';
import { getBigQueryJobsListNew, getBillingData } from '../utils/APICalls';
import { allDataColumns, bigQueryJobsListColumns } from '../utils/TableColumns';

const Dashboard = () => {
    
    const [queryParams,setQueryParams] = useSetState<BigQueryQueryParams>({allUsers:false,minCreationTime:"",maxCreationTime:"",parentJobId:""})
    return (
        <>
        <InfiniteTableTile title={"All Billing Data"} apiCall={getBigQueryJobsListNew} columns={bigQueryJobsListColumns} queryParams={queryParams} modal={<BigQueryTableModal setQueryParams={setQueryParams}/>}/>
        <BigQueryTableModal setQueryParams={setQueryParams}/>
        <Text>{JSON.stringify(queryParams)}</Text>
        </>
    );
}

export default Dashboard