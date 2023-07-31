import React,{ useState, Fragment } from 'react';

import {Table, Text, Title, Card, ScrollArea, ThemeIcon, Group, GroupProps} from '@mantine/core';
import "./Tiles.css"

import {IconArrowNarrowUp, IconArrowNarrowDown} from '@tabler/icons-react';

type ItemProps = {
    link:string,
    label:string,
    icon:React.FC
}

type TinyTileProps = {
    stat:number,
    other:React.ReactNode, // any react node/element
    item:ItemProps,
    color:string,
    percentage:number
}



const TinyTile = ( { stat, item, color, percentage } : TinyTileProps ) => {
    // Increase or decrease for tiny tiles
    const increase = <Group spacing="xs" style={{ marginTop: "10px" }}>
        <Group spacing="0">
            <IconArrowNarrowUp color="green" />
            <Text fz="sm" color="green">3.48%</Text>
        </Group>

        <Text fz="sm" color="dimmed">Since last month</Text>
    </Group>
    const decrease = <Group spacing="xs" style={{ marginTop: "10px" }}>
        <Group spacing="0">
            <IconArrowNarrowDown color="red" />
            <Text fz="sm" color="red">3.48%</Text>
        </Group>

        <Text fz="sm" color="dimmed">Since last month</Text>
    </Group>
    // console.log("item",item)
    return (
        <>
        <Card shadow="sm" padding="lg" radius="md" withBorder className="tiny-tile tile">
            <Group position="apart">
                    <div>
                        <Title order={5} color="dimmed">{item.label.toUpperCase()}</Title>
                        <Title>{stat}</Title>
                    </div>
                    <ThemeIcon radius="xl" size="xl" color={color}>{<item.icon />}</ThemeIcon>
                </Group>
                <Group spacing="xs" style={{ marginTop: "10px" }}>
                    <Group spacing="0">
                        {percentage<0 ? <IconArrowNarrowDown color="red" />
                        : <IconArrowNarrowUp color="green" />}

                        <Text fz="sm" color={percentage<0 ? "red" : "green"}>
                            {Math.abs(percentage)}
                        </Text>
                    </Group>
                    <Text fz="sm" color="dimmed">Since last month</Text>
                </Group>
            </Card>
        
        </>
    );
}

export default TinyTile