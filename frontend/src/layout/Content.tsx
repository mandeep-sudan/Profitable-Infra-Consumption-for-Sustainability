import { Text,Card,Image,Accordion } from '@mantine/core';
import "./Content.css"

import Billing from '../pages/Billing';
import Dataflow from '../pages/Dataflow';
import React from 'react';
import BigQuery from '../pages/BigQuery';
import NewTableTile from '../components/StaticTableTile';


type ContentProps = {
  active:string
}

const Content = ({active} : ContentProps) => {

  return (
    <div id="content">
        {
          {
            'Dashboard':<Text>Dashboard Information</Text>,
            'Dataflow': <Dataflow/>,
            'Airflow': <Text>Airflow Information</Text>,
            'BigQuery': <BigQuery/>,
            'DataProc':<Text>DataProc Information</Text>,
            'Billing':<Billing/>,
            'Other Settings':<Text>Other Settings Information</Text>
          }[active]
        }
    </div>
  );
}

export default Content