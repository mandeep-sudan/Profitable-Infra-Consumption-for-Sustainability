import React, { useEffect, useState } from 'react';
import { getBigQueryJobsList } from '../utils/APICalls';
import { bigQueryJobsListColumns } from '../utils/TableColumns';
import OldInfiniteTableTile from '../components/OldInfiniteTableTile';

const BigQuery = () => {

    return (
        <>
            <OldInfiniteTableTile title={"BigQuery Jobs"} bigSize={true} apiCall={getBigQueryJobsList} columns={bigQueryJobsListColumns} />
        </>
    );
}

export default BigQuery