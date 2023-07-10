import Demo from './Demo';
import { Text,Card,Image,Accordion } from '@mantine/core';
import "./Content.css"

const Content = () => {
  return (
    <div id="content">
      
      <Text fz="xs">Extra small text</Text>
      <Text fz="sm">Small text</Text>
      <Text fz="md">Default text</Text>
      <Text fz="lg">Large text</Text>
      <Text fz="xl">Extra large textjklsdjfklsda;jfklsda;jfkl;asdjklf;jasdklfjaskl;jdfkl;jakflsasfjdkl;dsajkjkasd;lfjfkdlsa;hgj;ahglk;wejklfa;jklfd;jdkslf</Text>
      <Text fw={500}>Semibold</Text>
      <Text fw={700}>Bold</Text>
      <Text fs="italic">Italic</Text>
      <Text td="underline">Underlined</Text>
      <Text td="line-through">Strikethrough</Text>
      <Text c="dimmed">Dimmed text</Text>
      <Text c="blue">Blue text</Text>
      <Text c="teal.4">Teal 4 text</Text>
      <Text tt="uppercase">Uppercase</Text>
      <Text tt="capitalize">capitalized text</Text>
      <Text ta="center">Aligned to center</Text>
      <Text ta="right">Aligned to right</Text>
    
    {/* <Demo/>
    <Demo/>
    <Demo/>
    <Demo/>
    <Demo/>
    <Demo/>
    <Demo/> */}
    </div>
  );
}

export default Content