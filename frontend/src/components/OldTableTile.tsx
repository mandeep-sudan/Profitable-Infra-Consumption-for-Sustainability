import React,{ useState, Fragment } from 'react';

import {Table,Title,Card,ScrollArea,Group,Button} from '@mantine/core';
import { camelCaseToReadable } from '../utils/formatAndModifyData';
import "./Tiles.css"

const createTableHeader = (tableData:any) => {

    let tableHeader : string[] = []
    if (tableData.length>0) {
        tableHeader=Object.keys(tableData[0])
    }
    // console.log(tableHeader)
    let modifiedTableHeader = tableHeader.map((colName:any,index:number) => {
        return (
            <th key={index} style={{whiteSpace:'nowrap'}}>
                {camelCaseToReadable(colName)}
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

const createRows = (tableData:any,modifiers:any) => {

    let tableHeader : string[] = []
    if (tableData.length>0) {
        tableHeader=Object.keys(tableData[0])
    }

    const rows = tableData.map((element:any) => {
        return (<tr>
            <Fragment>
                {
                    tableHeader.map((field:any) => {
                        // console.log(element[field]);
                        let cellValue;
                        // if (headersAndModifiers[field]["modifyJSON"] !== "") {
                        //     cellValue = headersAndModifiers[field]["modifyJSON"](element[field])
                        // }
                        if (field in modifiers) {
                            cellValue = modifiers[field](element[field])
                        }
                        else if (typeof element[field] === 'string' || element[field] instanceof String) {
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
        </tr>) // TO DO: fix key error
    })
    // console.log("rows",rows);
    return rows;
}


type TableTileProps = {
    title:string,
    tableData:any, // TO DO: ANY TYPE MIGHT BE QUESTIONABLE
    modifiers:any,
    bigSize:boolean
}

const OldTableTile = ({title,tableData,modifiers,bigSize}:TableTileProps) => {
    // console.log("tableHeader",tableHeader)
    // console.log("tableHeader",tableRows)

    return (
        <>
        <Card shadow="sm" padding="lg" radius="md" withBorder className={bigSize ? "tile full-tile" : "tile half-tile"}>
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
                    <tbody>{createRows(tableData,modifiers)}</tbody>
                </Table>
            </ScrollArea>
            
        </Card>
        
        </>
    );
}

export default OldTableTile