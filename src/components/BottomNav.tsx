import React from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { BottomNav } from '../styles/BottomNavStyles'
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

export default function LabelBottomNavigation() {
    const [value, setValue] = React.useState('recents');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNav value={value} onChange={handleChange}>
      <BottomNavigationAction value="/home" icon={<HomeIcon />} component={Link} to='/home'/>
      <BottomNavigationAction value="/customers" icon={<PersonIcon />} component={Link} to='/customers'/>
  <BottomNavigationAction value="/inventory" icon={<ShoppingCartIcon />} component={Link} to='/inventory' />
      <BottomNavigationAction value="/maintenance" icon={<BuildIcon />} component={Link} to='/maintenance'/>
      <BottomNavigationAction value="/incidents" icon={<ReportProblemIcon />} component={Link} to='/incidents'/>
    </BottomNav>
  );
}