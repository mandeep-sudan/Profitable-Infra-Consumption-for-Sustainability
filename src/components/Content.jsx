import Demo from './Demo';
import { Text,Card,Image,Accordion } from '@mantine/core';
import "./Content.css"

const Content = () => {
    const rows = [];
    const returnMultipleDemos = (numrows) => {
        for (let i = 0; i<numrows;i++) {
            rows.push(<Demo/>);
        }
        return <tbody>{rows}</tbody>
    }

  return (
    <div id="content">
        {/* {returnMultipleDemos()} */}
        <Demo/>
        <Demo/>
        <Demo/>
        <Demo/>
        <Demo/>
        <Demo/>
        <Demo/>
        <Demo/>
        <Demo/>
        
    </div>
  );
}

export default Content