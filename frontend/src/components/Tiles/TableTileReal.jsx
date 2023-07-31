import { useState, Fragment } from 'react';

import {Table,Title,Card,ScrollArea,Group,Button} from '@mantine/core';

const createTableHeader = (tableData) => {

    let tableHeader = []
    if (tableData.length > 0) {
        tableHeader = Object.keys(tableData[0])
    }
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

const createRows = (tableData) => {

    let tableHeader = []
    if (tableData.length > 0) {
        tableHeader = Object.keys(tableData[0])
    }

    const rows = tableData.map((element) => {
        return (<tr>
            <Fragment>
                {
                    tableHeader.map((field) => {
                        // console.log(element[field]);
                        let cellValue;
                        if (typeof element[field] === 'string' || element[field] instanceof String) {
                            cellValue = element[field];
                        } else {
                            cellValue = JSON.stringify(element[field])
                        }
                        // it's something else
                        return  <td style={{ whiteSpace: 'nowrap' }}>
                                    {cellValue}
                                </td>;
                    })
                }
            </Fragment>
        </tr>) // !!!!!!!!!!!!!!!!!!!!!!!!!!! NOT RIGHT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    })
    // console.log("rows",rows);
    return rows;
}

const TableTileReal = ({title,tableData}) => {
    // console.log("tableHeader",tableHeader)
    // console.log("tableHeader",tableRows)

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
                        {createTableHeader(tableData)}
                    </thead>
                    <tbody>{createRows(tableData)}</tbody>
                </Table>
            </ScrollArea>
            
        </Card>
        
        </>
    );
}

export default TableTileReal