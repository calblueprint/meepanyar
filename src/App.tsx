import React from 'react';
import { theme } from './styles/ThemeStyles';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import BaseNavigation from './components/BaseComponents/BaseNavigation';
import Login from './screens/Login';
import Home from './screens/Home/Home';

import CustomerMain from './screens/Customers/CustomerMain';
import CustomerProfile from './screens/Customers/CustomerProfile';
import CustomerRecords from './screens/Customers/CustomerRecords';
import AddCustomer from './screens/Customers/AddCustomer';
import EditCustomer from './screens/Customers/EditCustomer';
import AddMeterReading from './screens/Customers/AddMeterReading';
import FinancialSummariesMain from './screens/FinancialSummary/FinancialSummariesMain';

import Inventory from './screens/Inventory';
import Incidents from './screens/Incidents';
import Maintenance from './screens/Maintenance';

import FinancialSummary from './screens/FinancialSummary/FinancialSummary';
import FinancialSummaryPayment from './screens/FinancialSummary/FinancialSummaryPayment';

import { ConnectedRouter } from 'connected-react-router';
import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RootState } from './lib/redux/store';
import { connect } from 'react-redux';
import { history } from './lib/redux/store';

interface AppProps {
  isSignedIn: boolean;
}

function App(isSignedIn: AppProps) {
  const homeRedirect = isSignedIn ? '/home' : '/login';

  const Container = () => (
    <>
      <AuthenticatedRoute path="/home" component={Home} />

      <AuthenticatedRoute path="/customers" component={CustomerMain} exact />
      <AuthenticatedRoute path="/customers/create" component={AddCustomer} exact />
      <AuthenticatedRoute path={'/customers/customer'} component={CustomerProfile} exact />
      <AuthenticatedRoute path={'/customers/customer/edit'} component={EditCustomer} exact />
      <AuthenticatedRoute path="/customers/customer/meter-readings/create" component={AddMeterReading} exact />
      <AuthenticatedRoute path={'/customers/customer/records'} component={CustomerRecords} exact />
      <AuthenticatedRoute path="/financial-summaries" component={FinancialSummariesMain} />

      {
        //TODO: change path to ~"/financial-summaries/financial-summary/payment/create" once other screens are built out
      }
      <AuthenticatedRoute path="/confirm-payment" component={FinancialSummaryPayment} />

      <AuthenticatedRoute path="/inventory" component={Inventory} />
      <AuthenticatedRoute path="/maintenance" component={Maintenance} />
      <AuthenticatedRoute path="/incidents" component={Incidents} />

      <AuthenticatedRoute path="/financial-summary" component={FinancialSummary} exact />
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

export default connect(mapStateToProps)(App);
