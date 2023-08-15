import React,{ useEffect, useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import {Button,Group,Title} from '@mantine/core';
import "./Tiles.css"
import { AxiosResponse } from 'axios';

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



type NewTableTileProps<T> = {
  title:string
  columns: MRT_ColumnDef<T>[] // TO DO: make the class not any
  bigSize:boolean
  data:T[]
  isFetching:boolean
}

const StaticTableTile = <T,>({title,data,columns,bigSize,isFetching}:NewTableTileProps<T>) => {
  

  const renderTopToolbarCustomActions = ({ }) => (
    <Title order={2} style={{padding:"10px"}}>{title}</Title>
    )

  return <div className={bigSize ? "tile full-tile" : "tile half-tile"}>
    <MantineReactTable columns={columns}
                        renderTopToolbarCustomActions={renderTopToolbarCustomActions}
                        data={data}
                        initialState={{
                          density: 'xs'
                        }}
                        state={{
                          showProgressBars: isFetching,
                        }}
                        // enableColumnResizing={true}
                        layoutMode={'grid'}
                        enablePagination={false}
                        enableBottomToolbar={false}
    />
  </div>;
};

export default StaticTableTile;