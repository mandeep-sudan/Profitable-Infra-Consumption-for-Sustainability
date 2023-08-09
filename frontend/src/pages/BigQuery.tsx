import React, { useEffect, useState } from 'react';
import { getBigQueryJobsList} from '../utils/APICalls';
import { bigQueryJobsModifiers} from '../utils/formatAndModifyData';
import TableTile from '../components/TableTile';
import { bigQueryJobsListColumns } from '../utils/TableColumns';
// import { getDataFromEndpoint } from '../../utils';

const BigQuery = () => {
    const [bigQueryJobsList, setBigQueryJobsList] = useState([])

    useEffect(() => {
        getBigQueryJobsList("").then(response => {
            setBigQueryJobsList(response.data);
        })
    }, [])
    return (
        <>
            <TableTile title={"BigQuery Jobs"} data={bigQueryJobsList} bigSize={true}  columnsHelper={bigQueryJobsListColumns}/>
        </>
    );
}

export default BigQuery