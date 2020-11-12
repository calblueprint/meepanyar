import React from 'react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { BottomNav } from '../../styles/BottomNavStyles';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import BuildIcon from '@material-ui/icons/Build';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ReportProblemIcon from '@material-ui/icons/ReportProblem';

interface NavState {
  selectedScreen: string;
}

export default class LabelBottomNavigation extends React.Component<{}, NavState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      selectedScreen: 'recents',
    };
  }

  changeNavOption = (event: React.ChangeEvent<{}>, newSelection: string) => {
    this.setState({
      selectedScreen: newSelection,
    });
  };

  render() {
    return (
      <BottomNav value={this.state.selectedScreen} onChange={this.changeNavOption}>
        <BottomNavigationAction value="/home" icon={<HomeIcon />} component={Link} to="/home" />
        <BottomNavigationAction value="/customers" icon={<PersonIcon />} component={Link} to="/customers" />
        <BottomNavigationAction value="/inventory" icon={<ShoppingCartIcon />} component={Link} to="/inventory" />
        <BottomNavigationAction value="/maintenance" icon={<BuildIcon />} component={Link} to="/maintenance" />
        <BottomNavigationAction value="/incidents" icon={<ReportProblemIcon />} component={Link} to="/incidents" />
      </BottomNav>
    );
  }
}
