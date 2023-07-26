import { Text,Card,Image,Accordion } from '@mantine/core';
import "./Content.css"
import Dashboard from './Pages/Dashboard';
import Dataflow from './Pages/Dataflow';

const Content = ({active}) => {

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