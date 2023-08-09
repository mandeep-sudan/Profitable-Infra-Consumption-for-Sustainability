import React, { useEffect, useState } from 'react';
import { getBigQueryJobsList, getBigQueryJobsList2} from '../utils/APICalls';
import { bigQueryJobsModifiers} from '../utils/formatAndModifyData';
import TableTile from '../components/TableTile';
import { bigQueryJobsListColumns, bigQueryJobsListColumns2 } from '../utils/TableColumns';
import InfiniteTableTile from '../components/InfiniteTableTile';
// import { getDataFromEndpoint } from '../../utils';

const BigQuery = () => {
    const [bigQueryJobsList, setBigQueryJobsList] = useState([])

    useEffect(() => {
        getBigQueryJobsList2("").then(response => {
            setBigQueryJobsList(response.data);
        })
    }, [])
    return (
        <>
            <TableTile title={"BigQuery Jobs"} data={bigQueryJobsList} bigSize={true}  columnsHelper={bigQueryJobsListColumns2}/>
            <InfiniteTableTile title={"BigQuery Jobs"} bigSize={true} columns={bigQueryJobsListColumns}/>
        </>
    );
}

export default BigQuery