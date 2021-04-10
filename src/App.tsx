import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';
import BaseNavigation from './components/BaseComponents/BaseNavigation';
import { history, RootState } from './lib/redux/store';
import BaseComponentsDemo from './screens/BaseComponentsDemo';
import Camera from './screens/Camera/Camera';
import CameraPreview from './screens/Camera/CameraPreview';
import AddCustomer from './screens/Customers/AddCustomer';
import AddMeterReading from './screens/Customers/AddMeterReading';
import CustomerMain from './screens/Customers/CustomerMain';
import CustomerProfile from './screens/Customers/CustomerProfile';
import CustomerRecords from './screens/Customers/CustomerRecords';
import EditCustomer from './screens/Customers/EditCustomer';
import FinancialSummariesMain from './screens/FinancialSummary/FinancialSummariesMain';
import FinancialSummary from './screens/FinancialSummary/FinancialSummary';
import FinancialSummaryPayment from './screens/FinancialSummary/FinancialSummaryPayment';
import Home from './screens/Home/Home';
import Incidents from './screens/Incidents';
import ProfileMain from './screens/Profile/ProfileMain';
import UserProfile from './screens/Profile/UserProfile';
import SiteProfileMain from './screens/Profile/SiteProfileMain';
import SiteNameEdit from './screens/Profile/SiteNameEdit';
import AddInventory from './screens/Inventory/AddInventory';
import CreateInventoryUpdate from './screens/Inventory/CreateInventoryUpdate';
import CreatePurchaseRequest from './screens/Inventory/CreatePurchaseRequest';
import InventoryMain from './screens/Inventory/InventoryMain';
import InventoryProfile from './screens/Inventory/InventoryProfile';
import PurchaseRequest from './screens/Inventory/PurchaseRequest';
import PurchaseRequests from './screens/Inventory/PurchaseRequests';
import Login from './screens/Login';
import Maintenance from './screens/Maintenance';
import { theme } from './styles/ThemeStyles';





interface AppProps {
  isSignedIn: boolean;
}

function App(isSignedIn: AppProps) {
  const homeRedirect = isSignedIn ? '/home' : '/login';

  const Container = () => (
    <>
      <AuthenticatedRoute path="/home" component={Home} />
      <AuthenticatedRoute path="/profile" component={ProfileMain} exact />
      <AuthenticatedRoute path="/profile/user" component={UserProfile} exact />
      <AuthenticatedRoute path="/profile/site" component={SiteProfileMain} exact />
      <AuthenticatedRoute path="/profile/site/name" component={SiteNameEdit} exact />
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

      <AuthenticatedRoute path="/inventory" component={InventoryMain} exact/>
      <AuthenticatedRoute path="/inventory/create" component={AddInventory} />
      <AuthenticatedRoute path="/inventory/item" component={InventoryProfile} /> 
      <AuthenticatedRoute path="/inventory/purchase-requests" component={PurchaseRequests} exact/> 
      <AuthenticatedRoute path="/inventory/purchase-requests/create" component={CreatePurchaseRequest} /> 
      <AuthenticatedRoute path="/inventory/purchase-requests/purchase-request" component={PurchaseRequest} /> 
      <AuthenticatedRoute path="/inventory/updates/create" component={CreateInventoryUpdate} /> 

      <AuthenticatedRoute path="/maintenance" component={Maintenance} />
      <AuthenticatedRoute path="/incidents" component={Incidents} />

      <AuthenticatedRoute path="/financial-summary" component={FinancialSummary} exact />
      <AuthenticatedRoute path="/base-components" component={BaseComponentsDemo} exact />
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
              <Route path="/camera" component={Camera} exact />
              <Route path="/camera/preview" component={CameraPreview} exact />
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
