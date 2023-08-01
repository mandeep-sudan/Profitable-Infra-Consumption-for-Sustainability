import { Text,Card,Image,Accordion } from '@mantine/core';
import "./Content.css"

import Dashboard from '../pages/Dashboard';
import Dataflow from '../pages/Dataflow';
import React from 'react';


type ContentProps = {
  active:string
}

const Content = ({active} : ContentProps) => {

  return (
    <div id="content">
        {
          {
            'Dashboard':<Dashboard/>,
            'Dataflow': <Dataflow/>,
            'Airflow': <Text>Airflow Information</Text>,
            'BigQuery': <Text>BigQuery Information</Text>,
            'DataProc':<Text>DataProc Information</Text>,
            'Billing':<Text>Billing Information</Text>,
            'Other Settings':<Text>Other Settings Information</Text>
          }[active]
        }
    </div>
  );
}

export default Content