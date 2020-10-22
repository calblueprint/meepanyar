import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { Root, Bar, MenuButton, AccountButton, ListStyle, ToolBar, Typograph } from '../styles/TopNavStyles';

type Anchor = 'left';

export default function HomeNavBar() {
    const [state, setState] = React.useState({
        left: false,
    });

    const tabs = [{
        route: "/customers",
        icon: PersonIcon,
        label: "Customers"
      },{
        route: "/inventory",
        icon: ShoppingCartIcon,
        label: "Inventory"
      },{
          route: "/maintenance",
          icon: BuildIcon,
          label: "Maintenance"
      },{
        route: "/incidents",
        icon: ReportProblemIcon,
        label: "Incidents"
      }]

    const tabs2 = [{
        route: "/sites",
        icon: LocationOnIcon,
        label: "Sites"
      },{
        route: "/staff",
        icon: WbSunnyIcon,
        label: "Staff"
      }]

    const toggleDrawer = (anchor: Anchor, open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
      ) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor: Anchor) => (
        <ListStyle
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
        {tabs.map((tab, index) => (
          <ListItem button key={tab.label}>
            <ListItemIcon>{<tab.icon/>}</ListItemIcon>
            <ListItemText primary={tab.label} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {tabs2.map((tab, index) => (
          <ListItem button key={tab.label}>
            <ListItemIcon>{<tab.icon/>}</ListItemIcon>
            <ListItemText primary={tab.label} />
          </ListItem>
        ))}
      </List>
        </ListStyle>
      );

  return (
    <Root>
      <Bar>
        <ToolBar>
          <MenuButton>
            <React.Fragment key={'left'}>
                <MenuIcon onClick={toggleDrawer('left', true)}>{'left'}</MenuIcon>
                <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                    {list('left')}
                </Drawer>
            </React.Fragment>
          </MenuButton>
          <Typograph variant="h4" noWrap>
            Site Name
          </Typograph>
          <Typograph variant="h6" noWrap>
            Insert last connected to network thing
          </Typograph>
          <AccountButton aria-label="account of current user">
            <AccountCircleIcon />
          </AccountButton>
        </ToolBar>
      </Bar>
    </Root>
  );
}