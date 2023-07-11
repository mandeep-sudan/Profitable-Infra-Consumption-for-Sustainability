import { useState, Fragment } from 'react';

import {Table,Title,Card,ScrollArea,Group,Button} from '@mantine/core';

const createTableHeader = (tableHeader) => {
    // console.log(tableHeader)
    let modifiedTableHeader = tableHeader.map((colName,index) => {
        return (
            <th key={index} style={{whiteSpace:'nowrap'}}>
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
    let modifiedTableRow = tableRow.map((colVal,index) => {
        return (
            <td key={index} style={{whiteSpace:'nowrap'}}>
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
        <Card shadow="sm" padding="lg" radius="md" withBorder className="table-tile tile">
            <Group position="apart">
                <Title order={2}>{title}</Title>
                <Group>
                    <Button size="xs" color="yellow">Change Date</Button>
                    <Button size="xs" color="orange">Last Month</Button>
                    <Button size="xs" color="green">Last 3 Months</Button>
                </Group>
            </Group>
            <ScrollArea w={"100%"}>
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