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
            'Airflow': <Text>Hi</Text>,
            'BigQuery': <Text>Yo</Text>,
            'DataProc':<Text>Me</Text>,
            'Billing':<Text>We</Text>,
            'Other Settings':<Text>Hey</Text>
          }[active]
        }
    </div>
  );
}

export default Content