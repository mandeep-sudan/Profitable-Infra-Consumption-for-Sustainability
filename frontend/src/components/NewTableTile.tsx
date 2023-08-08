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
  columnsHelper:any // TO DO: make the class not any
  modifiers:any
  bigSize:boolean
}

const NewTableTile = ({title,data,columnsHelper,modifiers,bigSize}:NewTableTileProps) => {

  const columns = columnsHelper()
  const renderTopToolbarCustomActions = ({ }) => (
    <Title>{title}</Title>
    )

  return <div className={bigSize ? "tile full-tile" : "tile half-tile"}>
    <MantineReactTable columns={columns}
                        renderTopToolbarCustomActions={renderTopToolbarCustomActions}
                        data={data}
                        initialState={{
                          density: 'xs'
                        }}
    />
  </div>;
};

export default NewTableTile;