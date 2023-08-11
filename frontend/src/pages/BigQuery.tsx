import React, { useEffect, useState } from 'react';
import { getBigQueryJobsList} from '../utils/APICalls';
import { bigQueryJobsModifiers} from '../utils/formatAndModifyData';
import TableTile from '../components/TableTile';
import { bigQueryJobsListColumns } from '../utils/TableColumns';
import InfiniteTableTile from '../components/InfiniteTableTile';
// import { getDataFromEndpoint } from '../../utils';

const BigQuery = () => {
    const [bigQueryJobsList, setBigQueryJobsList] = useState([])

    useEffect(() => {
        getBigQueryJobsList("").then(response => {
            setBigQueryJobsList(response.data.rowList);
        })
    }, [])
    return (
        <>
            {/* <TableTile title={"BigQuery Jobs"} data={bigQueryJobsList} bigSize={true}  columns={bigQueryJobsListColumns}/> */}
            <InfiniteTableTile title={"BigQuery Jobs"} bigSize={true} apiCall={getBigQueryJobsList} columns={bigQueryJobsListColumns}/>
        </>
    );
}

export default BigQuery