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
  apiCall: (pageToken:string)=>Promise<AxiosResponse<T[], any>>
  columns: MRT_ColumnDef<T>[] // TO DO: make the class not any
  bigSize:boolean
  apiStr:string
}

const StaticTableTile = <T,>({title,apiCall,apiStr,columns,bigSize}:NewTableTileProps<T>) => {
  const [data,setData] = useState<T[]>([]);
  const [isFetching,setIsFetching] = useState<boolean>(true);
  
  useEffect(() => {
    apiCall(apiStr).then(response => {
      setData(response.data)
      setIsFetching(false)
    })
}, [])

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