import { useState, Fragment } from 'react';

import {Table,Title,Card,ScrollArea,ThemeIcon,Group} from '@mantine/core';
import "./Tiles.css"

const TinyTile = ({stat,other,item,color}) => {
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