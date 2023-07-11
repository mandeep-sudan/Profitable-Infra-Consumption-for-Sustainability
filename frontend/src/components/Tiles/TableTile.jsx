import { useState, Fragment } from 'react';

import {Table,Title,Card,ScrollArea} from '@mantine/core';

const createTableHeader = (tableHeader) => {
    // console.log(tableHeader)
    let modifiedTableHeader = tableHeader.map((colName) => {
        return (
            <th>
                {colName}
            </th>
        )
    }
        
    )
    return (
            <tr>
                <Fragment>
                    {modifiedTableHeader}
                </Fragment>
            </tr>
    );
}

const createRows = (tableRow) => {
    let modifiedTableRow = tableRow.map((colVal) => {
        return (
            <td>
                {colVal}
            </td>
        )})
    
    let rows = []
    for (let i=0;i<9;i++) {
        rows.push(<tr key={i}>
            <Fragment>
                {modifiedTableRow}
            </Fragment>
        </tr>)
    }
    // console.log(rows)
    return rows;
}

const TableTile = ({title,tableHeader,tableRows}) => {

    return (
        <>
        <Card shadow="sm" padding="lg" radius="md" withBorder className="tile">
            <Title>{title}</Title>
            <ScrollArea>
                <Table>
                    <thead>
                        {createTableHeader(tableHeader)}
                    </thead>
                    <tbody>{createRows(tableRows)}</tbody>
                </Table>
            </ScrollArea>
            
        </Card>
        
        </>
    );
}

export default TableTile