import React from 'react';
import './App.css';
import Login from './screens/Login';
import CustomerMain from './screens/Customers/CustomerMain';
import CustomerProfile from './screens/Customers/CustomerProfile';
import CustomerRecords from './screens/Customers/CustomerRecords';
import AddCustomer from './screens/Customers/AddCustomer';
import EditCustomer from './screens/Customers/EditCustomer';
import AddMeterReading from './screens/Customers/AddMeterReading';
import Inventory from './screens/Inventory';
import Incidents from './screens/Incidents';
import Maintenance from './screens/Maintenance';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RootState } from './lib/redux/store';
import LabelBottomNavigation from './components/BaseComponents/BottomNav';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { theme } from './styles/ThemeStyles';
import { history } from './lib/redux/store';
import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';
import Home from './screens/Home';

interface AppProps {
  isSignedIn: boolean;
}

function App(isSignedIn: AppProps) {
  const homeRedirect = isSignedIn ? '/home' : '/login';

  return (
    <div className="App">
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <LabelBottomNavigation />
            <Switch>
              <Route exact path="/">
                <Redirect to={homeRedirect} />
              </Route>
              <Route path="/login" component={Login} />
              <AuthenticatedRoute path="/home" component={Home} />
              <AuthenticatedRoute path="/customers" component={CustomerMain} exact />
              <AuthenticatedRoute path="/inventory" component={Inventory} />
              <AuthenticatedRoute path="/maintenance" component={Maintenance} />
              <AuthenticatedRoute path="/incidents" component={Incidents} />
              <AuthenticatedRoute path={'/customers/:rid'} component={CustomerProfile} exact />
              <AuthenticatedRoute path={'/customers/:rid/records'} component={CustomerRecords} />
              <AuthenticatedRoute path="/customers/add" component={AddCustomer} />
              <AuthenticatedRoute path="/customers/:rid/addMeter" component={AddMeterReading} />
              <AuthenticatedRoute path={'/customers/:rid/edit'} component={EditCustomer} />
            </Switch>
          </ConnectedRouter>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  isSignedIn: state.userData.user !== null,
});

export default connect(mapStateToProps)(App);
