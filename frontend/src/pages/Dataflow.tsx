import React,{ useState } from 'react';
// import TableTile from '../Tiles/TableTile'
import { Button,Text,Group } from '@mantine/core';
import GeneralInfiniteTableTile from '../components/GeneralInfiniteTableTile';
import { getBillingData } from '../utils/APICalls';
import { allDataColumns } from '../utils/TableColumns';
import TableTileModal from '../components/BillingTableModal/BillingTableModal';
import BillingTableModal from '../components/BillingTableModal/BillingTableModal';
// import TinyTile from '../Tiles/TinyTile';

const Dataflow = () => {
    const [queryParams, setQueryParams] = useState<BillingQueryParams>({matches:[],betweenDates:[],betweenValues:[],sortings:[{field:"usage_start_time",ascending:false}]});
    
    return (
        <>
        <GeneralInfiniteTableTile title={"New Full Data"} apiCall={getBillingData} columns={allDataColumns} queryParams={queryParams} modal={<BillingTableModal setQueryParams={setQueryParams}/>}/>
        </>
    );
}

export default Dataflow