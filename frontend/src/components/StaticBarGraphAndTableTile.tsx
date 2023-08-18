import React, { useEffect, useMemo, useState } from 'react';
import {
    type MRT_ColumnDef,
} from 'mantine-react-table';
import { Card, Center, Group, SegmentedControl, Title } from '@mantine/core';
import "./Tiles.css"
import StaticTableTile from './StaticTableTile';
import StaticBarGraph from './StaticBarGraph';
import { Prism } from '@mantine/prism';
import { IconChartBar, IconTable, IconCode } from '@tabler/icons-react';


// type Person = {
//   name: {
//     firstName: string;
//     lastName: string;
//   };
//   address: string;
//   city: string;
//   state: string;
// };

//nested data is ok, see accessorKeys in ColumnDef below

type StaticTileProps<T> = {
    title: string
    columns: MRT_ColumnDef<T>[] // TO DO: make the class not any
    bigSize: boolean
    data: T[]
    // isFetching: boolean
    axesKeysAndLabels: AxesKeysAndLabels
}

const StaticBarGraphAndTableTile = <T,>({ title, data, columns, bigSize, axesKeysAndLabels }: StaticTileProps<T>) => {
    const [tileStatus, setTileStatus] = useState<string>("barGraph")

    return (
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: "100%" }} className={bigSize ? "tile full-tile" : "tile half-tile"}>
                {/* <Title order={2} style={{ padding: "10px" }}>{title}</Title> */}
                <Group position="apart" style={{ padding: "10px" }}>
                    <Title order={2} >{title}</Title>
                    <SegmentedControl value={tileStatus}
                        onChange={setTileStatus}
                        data={[
                            {
                                label: <Center>
                                    <IconChartBar />
                                    {/* <Box ml={10}>Bar Graph</Box> */}
                                </Center>, value: 'barGraph'
                            },
                            {
                                label: <Center>
                                    <IconTable />
                                    {/* <Box ml={10}>Table</Box> */}
                                </Center>, value: 'table'
                            },
                            {
                                label: <Center>
                                    <IconCode />
                                    {/* <Box ml={10}>Table</Box> */}
                                </Center>, value: 'json'
                            }
                        ]}
                        color="blue"
                    />
                </Group>
                {
                    {
                        'barGraph': <StaticBarGraph data={data} axesKeysAndLabels={axesKeysAndLabels} />,
                        'table': <StaticTableTile data={data} columns={columns}/>,
                        'json':<Prism language="json">{JSON.stringify(data)}</Prism>
                    }[tileStatus]
                }
            </Card>
    );
};

export default StaticBarGraphAndTableTile;