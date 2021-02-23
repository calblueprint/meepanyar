import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  }, 
  wrapper: {
    minWidth: '0px'
  }
});

export default function LabelBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction value="/home" icon={<HomeIcon />} component={Link} to='/home'/>
      <BottomNavigationAction value="/customers" icon={<PersonIcon />} component={Link} to='/customers'/>
  <BottomNavigationAction value="/inventory" icon={<ShoppingCartIcon />} component={Link} to='/inventory' />
      <BottomNavigationAction value="/maintenance" icon={<BuildIcon />} component={Link} to='/maintenance'/>
      <BottomNavigationAction value="/incidents" icon={<ReportProblemIcon />} component={Link} to='/incidents'/>
    </BottomNavigation>
  );
}