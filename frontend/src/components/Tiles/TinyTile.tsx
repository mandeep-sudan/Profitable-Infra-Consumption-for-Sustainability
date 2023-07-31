import React,{ useState, Fragment } from 'react';

import {Table, Title, Card, ScrollArea, ThemeIcon, Group, GroupProps} from '@mantine/core';
import "./Tiles.css"


type ItemProps = {
    link:string,
    label:string,
    icon:React.FC
}

type TinyTileProps = {
    stat:number,
    other:React.ReactNode, // any react node/element
    item:ItemProps,
    color:string
}

const TinyTile = ( { stat, other, item, color } : TinyTileProps ) => {
    // console.log("item",item)
    return (
        <>
        <Card shadow="sm" padding="lg" radius="md" withBorder className="tiny-tile tile">
            <Group position="apart">
                <div>
                    <Title order={5} color="dimmed">{item.label.toUpperCase()}</Title>
                    <Title>{stat}</Title>
                </div>
                <ThemeIcon radius="xl" size="xl" color={color}>{<item.icon/>}</ThemeIcon>
            </Group>
            {other}
        </Card>
        
        </>
    );
}

export default TinyTile