import React from 'react';
import './App.css';
import Inventory from './screens/Inventory';
import Home from './screens/Home';
import Incidents from './screens/Incidents';
import Maintenance from './screens/Maintenance';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import LabelBottomNavigation from './components/BaseComponents/BottomNav';
import Login from './screens/Login';
import CustomerMain from './screens/Customers/CustomerMain';
import CustomerProfile from './screens/Customers/CustomerProfile';
import CustomerRecords from './screens/Customers/CustomerRecords';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { theme } from './styles/ThemeStyles';
import { history } from './lib/redux/store';

function App() {
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <LabelBottomNavigation />
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/customers" exact component={CustomerMain} />
              <Route path="/inventory" component={Inventory} />
              <Route path="/maintenance" component={Maintenance} />
              <Route path="/incidents" component={Incidents} />
              <Route path="/login" component={Login} history={history} />
              <Route path={'/customers/:rid'} exact component={CustomerProfile} />
              <Route path={'/customers/:rid/records'} component={CustomerRecords} />
            </Switch>
          </ConnectedRouter>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
