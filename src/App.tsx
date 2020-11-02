import React from 'react';
import './App.css';
import User from './screens/User';
import Inventory from './screens/Inventory';
import Home from './screens/Home';
import Incidents from './screens/Incidents';
import Maintenance from './screens/Maintenance';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LabelBottomNavigation from './components/BaseComponents/BottomNav';
import Login from './screens/Login';
import CustomerProfile from './screens/CustomerProfile';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { theme } from './styles/ThemeStyles';

function App() {
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <LabelBottomNavigation />
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/customers" component={User} />
              <Route path="/inventory" component={Inventory} />
              <Route path="/maintenance" component={Maintenance} />
              <Route path="/incidents" component={Incidents} />
              <Route path="/login" component={Login} />
              <Route path="/customerProfile" component={CustomerProfile} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
