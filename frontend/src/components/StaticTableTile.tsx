import React,{ useEffect, useMemo, useState } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import {Button,Group,Title} from '@mantine/core';
import "./Tiles.css"
import { AxiosResponse } from 'axios';
import { IconChartBar } from '@tabler/icons-react';
// import {IconArrowNarrowUp, IconArrowNarrowDown} from '@tabler/icons-react';
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



type StaticTableTileProps<T> = {
  columns: MRT_ColumnDef<T>[] // TO DO: make the class not any
  data:T[]
}

const StaticTableTile = <T,>({data,columns}:StaticTableTileProps<T>) => {

  return (
    <MantineReactTable columns={columns}
                        // renderTopToolbarCustomActions={renderTopToolbarCustomActions}
                        data={data}
                        initialState={{
                          density: 'xs'
                        }}
                        // state={{
                        //   showProgressBars: isFetching,
                        // }}
                        // enableColumnResizing={true}
                        layoutMode={'grid'}
                        enablePagination={false}
                        enableBottomToolbar={false}
    />);
};

export default StaticTableTile;