import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Footer,
  Aside,
  CloseButton,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';
import NavbarContent from './NavbarContent'
import Content from './Content'
import "./MainPage.css"

const MainPage = () => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [active, setActive] = useState('Dashboard');
  return (
    <AppShell
    id="app-shell"
    layout="alt"
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar height="100%" p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <Burger id="close-nav-bar" onClick={() => setOpened(false)}
                        opened={opened}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"/>
          </MediaQuery>
          
          <NavbarContent active={active} setActive={setActive}/>
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

            <Text>{active}</Text>
          </div>
        </Header>
      }
    >
      <Content active={active}/>
    </AppShell>
  );
}

export default MainPage