import React, { useState } from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { withStyles, createStyles } from '@material-ui/core/styles';

const styles = () =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: 0,
      width: '100%',
      boxShadow: '4px 4px 20px 0px rgba(0, 0, 0, 0.25)',
    },
    action: {
      minWidth: 20,
    },
  });

interface BaseNavigationProps {
  classes: { root: string; action: string };
}

function BaseNavigation(props: BaseNavigationProps) {
  const { classes } = props;
  const [selectedScreen, setSelectedScreen] = useState('recents');

  const changeNavOption = (event: React.ChangeEvent<{}>, newSelection: string) => {
    setSelectedScreen(newSelection);
  };

  return (
    <BottomNavigation className={classes.root} value={selectedScreen} onChange={changeNavOption}>
      <BottomNavigationAction
        className={classes.action}
        value="/home"
        icon={<HomeIcon />}
        component={Link}
        to="/home"
      />
      <BottomNavigationAction
        className={classes.action}
        value="/customers"
        icon={<PersonIcon />}
        component={Link}
        to="/customers"
      />
      <BottomNavigationAction
        className={classes.action}
        value="/inventory"
        icon={<ShoppingCartIcon />}
        component={Link}
        to="/inventory"
      />
      <BottomNavigationAction
        className={classes.action}
        value="/maintenance"
        icon={<BuildIcon />}
        component={Link}
        to="/maintenance"
      />
      <BottomNavigationAction
        className={classes.action}
        value="/incidents"
        icon={<ReportProblemIcon />}
        component={Link}
        to="/incidents"
      />
    </BottomNavigation>
  );
}

export default withStyles(styles)(BaseNavigation);
