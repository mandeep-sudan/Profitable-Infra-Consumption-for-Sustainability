import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavbarContent from './components/NavbarContent'
import Content from './components/Content'

import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

const App = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
    layout="alt"
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <NavbarContent/>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      <Content/>
    </AppShell>
  );
}

// function App() {
//   return (
//     <AppShell
//       padding="md"
//       navbar={<Navbar width={{ base: 300 }} height={500} p="xs"><NavBar/></Navbar>}
//       header={<Header height={60} p="xs">{/* Header content */}</Header>}
//       styles={(theme) => ({
//         main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
//       })}>
//       <Content/>
//     </AppShell>
//   );
// }

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //     <Group position="apart">
// //       <NavBar/>
// //       <div id='Content'>
// //         <Demo/>
// //         <Demo/>
// //         <Demo/>
// //         <Demo/>
// //         <Demo/>
// //         <Demo/>
// //       </div>
// //     </Group>
    
// //     </>
// //   )
// // }

export default App
