import React,{ useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table';
import {Button,Group,Title} from '@mantine/core';
import "./Tiles.css"

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



type NewTableTileProps = {
  title:string
  data:any
  columns:any // TO DO: make the class not any
  bigSize:boolean
}

const TableTile = ({title,data,columns,bigSize}:NewTableTileProps) => {

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
                        // enableColumnResizing={true}
                        layoutMode={'grid'}
                        enablePagination={false}
                        enableBottomToolbar={false}
    />
  </div>;
};

export default TableTile;