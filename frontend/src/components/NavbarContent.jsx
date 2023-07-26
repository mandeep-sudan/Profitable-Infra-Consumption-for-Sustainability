import { useState } from 'react'
import { createStyles, ScrollArea, Navbar, Group, Image, getStylesRef, rem,  } from '@mantine/core';
import {
  IconSettings,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconWind,
  IconDashboard,
  IconDatabaseLeak,
  IconBrandGoogleBigQuery,
  IconDatabaseCog,
} from '@tabler/icons-react';
import { MantineLogo } from '@mantine/ds';
import imgUrl from '../images/DeloitteLogo.png'


const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },
}));

const data = [
  { link: '', label: 'Dashboard', icon: IconDashboard },
  { link: '', label: 'Dataflow', icon: IconDatabaseLeak },
  { link: '', label: 'Airflow', icon: IconWind },
  { link: '', label: 'BigQuery', icon: IconBrandGoogleBigQuery },
  { link: '', label: 'DataProc', icon: IconDatabaseCog },
  { link: '', label: 'Billing', icon: IconReceipt2 },
  { link: '', label: 'Other Settings', icon: IconSettings },
];


const NavbarContent = ({active,setActive}) => {

  const { classes, cx } = useStyles();
  // const [active, setActive] = useState('Dashboard');

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <ScrollArea>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Image src={imgUrl} height="60px" width={"auto"}/>
          {/* <MantineLogo size={28} /> */}
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
      </ScrollArea>
  );
}

export default NavbarContent
