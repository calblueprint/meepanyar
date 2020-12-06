import React from 'react';
import { theme } from './styles/ThemeStyles';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import BaseNavigation from './components/BaseComponents/BaseNavigation';
import Login from './screens/Login';
import Home from './screens/Home';

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
import { connect } from 'react-redux';
import { history } from './lib/redux/store';
import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';

const styles = () =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
  });

interface AppProps {
  isSignedIn: boolean;
  classes: { wrapper: string };
}

function App(props: AppProps) {
  const { classes, isSignedIn } = props;
  const homeRedirect = isSignedIn ? '/home' : '/login';

  const Container = () => (
    <>
      <AuthenticatedRoute path="/home" component={Home} />
      <AuthenticatedRoute exact path="/customers" component={CustomerMain} />
      <AuthenticatedRoute path="/inventory" component={Inventory} />
      <AuthenticatedRoute path="/maintenance" component={Maintenance} />
      <AuthenticatedRoute path="/incidents" component={Incidents} />
      {/* <AuthenticatedRoute exact path={'/customers/:rid'} component={CustomerProfile} /> */}
      <AuthenticatedRoute path={'/customers/:rid/records'} component={CustomerRecords} />
      <AuthenticatedRoute path="/customers/add" component={AddCustomer} />
      <AuthenticatedRoute path="/customers/:rid/addMeter" component={AddMeterReading} />
      <AuthenticatedRoute path={'/customers/:rid/edit'} component={EditCustomer} />
      <BaseNavigation />
    </>
  );

  return (
    <div className="App">
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/">
                <Redirect to={homeRedirect} />
              </Route>
              <Route exact path="/(login)" component={Login} />
              <Route component={Container} />
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

export default connect(mapStateToProps)(withStyles(styles)(App));
