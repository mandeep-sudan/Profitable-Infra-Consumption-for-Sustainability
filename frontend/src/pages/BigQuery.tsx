import React, { useEffect, useState } from 'react';
import { getBigQueryJobsList } from '../utils/APICalls';
import { bigQueryJobsListColumns } from '../utils/TableColumns';
import InfiniteTableTile from '../components/InfiniteTableTile';

const BigQuery = () => {

    return (
        <>
            <InfiniteTableTile title={"BigQuery Jobs"} bigSize={true} apiCall={getBigQueryJobsList} columns={bigQueryJobsListColumns} />
        </>
    );
}

export default BigQuery