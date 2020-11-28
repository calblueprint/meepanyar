import React, { useState } from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      boxShadow: '0 0 10px 5px #e5e5e5',
      overflow: 'hidden',
    },
  });

// const styles = (theme: Theme) =>
//   createStyles({
//     root: {
//       position: 'absolute',
//       bottom: 0,
//       width: '100%',
//       box-shadow: '0 0 10px 5px #e5e5e5'
//       overflow: 'hidden',
//     },
//   },
// });

interface NavState {
  selectedScreen: string;
}

function BaseNavigation(props: {}) {
  const [selectedScreen, setSelectedScreen] = useState('recents');

  const changeNavOption = (event: React.ChangeEvent<{}>, newSelection: string) => {
    setSelectedScreen(newSelection);
  };

  return (
    <BottomNavigation value={selectedScreen} onChange={changeNavOption}>
      <BottomNavigationAction value="/home" icon={<HomeIcon />} component={Link} to="/home" />
      <BottomNavigationAction value="/customers" icon={<PersonIcon />} component={Link} to="/customers" />
      <BottomNavigationAction value="/inventory" icon={<ShoppingCartIcon />} component={Link} to="/inventory" />
      <BottomNavigationAction value="/maintenance" icon={<BuildIcon />} component={Link} to="/maintenance" />
      <BottomNavigationAction value="/incidents" icon={<ReportProblemIcon />} component={Link} to="/incidents" />
    </BottomNavigation>
  );
}

export default withStyles(styles)(BaseNavigation);
