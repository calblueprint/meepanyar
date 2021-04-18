import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/authentication/AuthenticatedRoute';
import BaseNavigation from './components/BaseComponents/BaseNavigation';
import { history } from './lib/redux/store';
import { selectCurrentUserIsSignedIn } from './lib/redux/userData';
import BaseComponentsDemo from './screens/BaseComponentsDemo';
import Camera from './screens/Camera/Camera';
import CameraPreview from './screens/Camera/CameraPreview';
import AddCustomer from './screens/Customers/AddCustomer';
import AddMeterReading from './screens/Customers/AddMeterReading';
import EditStartingMeter from './screens/Customers/EditStartingMeter';
import AddPayment from './screens/Customers/AddPayment';
import CustomerMain from './screens/Customers/CustomerMain';
import EditCustomerInformation from './screens/Customers/EditCustomerInformation';
import CustomerProfile from './screens/Customers/CustomerProfile';
import CustomerRecords from './screens/Customers/CustomerRecords';
import EditCustomer from './screens/Customers/EditCustomer';
import FinancialSummariesMain from './screens/FinancialSummary/FinancialSummariesMain';
import FinancialSummary from './screens/FinancialSummary/FinancialSummary';
import FinancialSummaryPayment from './screens/FinancialSummary/FinancialSummaryPayment';
import Home from './screens/Home/Home';
import Incidents from './screens/Incidents';
import ProfileMain from './screens/Profile/ProfileMain';
import EditUserProfile from './screens/Profile/EditUserProfile';
import SiteProfileMain from './screens/Profile/SiteProfileMain';
import UserInformationMain from './screens/Profile/UserInformationMain';
import EditUserInformation from './screens/Profile/EditUserInformation';
import EditSiteInformation from './screens/Profile/EditSiteInformation';
import TariffPlans from './screens/Profile/TariffPlans';
import EditTariffPlanInformation from './screens/Profile/EditTariffPlanInformation';
import AddInventory from './screens/Inventory/AddInventory';
import CreateInventoryUpdate from './screens/Inventory/CreateInventoryUpdate';
import CreatePurchaseRequest from './screens/Inventory/CreatePurchaseRequest';
import InventoryMain from './screens/Inventory/InventoryMain';
import InventoryProfile from './screens/Inventory/InventoryProfile';
import PurchaseRequest from './screens/Inventory/PurchaseRequest';
import PurchaseRequestsMain from './screens/Inventory/PurchaseRequestsMain';
import Login from './screens/Login';
import Maintenance from './screens/Maintenance';
import { theme } from './styles/ThemeStyles';


function App() {
  const isSignedIn = useSelector(selectCurrentUserIsSignedIn);
  const homeRedirect = isSignedIn ? '/home' : '/login';

  const Container = () => (
    <>
      <AuthenticatedRoute path="/home" component={Home} />
      <AuthenticatedRoute path="/profile" component={ProfileMain} exact />
      <AuthenticatedRoute path="/profile/user" component={EditUserProfile} exact />
      <AuthenticatedRoute path="/profile/site" component={SiteProfileMain} exact />
      <AuthenticatedRoute path="/profile/site/name" component={EditSiteInformation} exact />
      <AuthenticatedRoute path="/profile/site/tariff-plans" component={TariffPlans} exact />
      <AuthenticatedRoute path="/profile/site/tariff-plans/tariff-plan" component={EditTariffPlanInformation} exact />
      <AuthenticatedRoute path="/profile/site/user-information" component={UserInformationMain} exact />
      <AuthenticatedRoute path="/profile/site/user-information/user" component={EditUserInformation} exact />
      <AuthenticatedRoute path="/customers" component={CustomerMain} exact />
      <AuthenticatedRoute path="/customers/create" component={AddCustomer} exact />
      <AuthenticatedRoute path={'/customers/customer'} component={CustomerProfile} exact />
      <AuthenticatedRoute path={'/customers/customer/edit'} component={EditCustomer} exact />
      <AuthenticatedRoute path={'/customers/customer/edit/information'} component={EditCustomerInformation} exact />
      <AuthenticatedRoute path="/customers/customer/meter-readings/create" component={AddMeterReading} exact />
      <AuthenticatedRoute path="/customers/customer/payments/create" component={AddPayment} exact />
      <AuthenticatedRoute path={'/customers/customer/starting-meter-reading/edit'} component={EditStartingMeter} exact />
      <AuthenticatedRoute path={'/customers/customer/records'} component={CustomerRecords} exact />
      <AuthenticatedRoute path="/financial-summaries" component={FinancialSummariesMain} />

      {
        //TODO: change path to ~"/financial-summaries/financial-summary/payment/create" once other screens are built out
      }
      <AuthenticatedRoute path="/confirm-payment" component={FinancialSummaryPayment} />

      <AuthenticatedRoute path="/inventory" component={InventoryMain} exact/>
      <AuthenticatedRoute path="/inventory/create" component={AddInventory} />
      <AuthenticatedRoute path="/inventory/item" component={InventoryProfile} /> 
      <AuthenticatedRoute path="/inventory/purchase-requests" component={PurchaseRequestsMain} exact/> 
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


export default App;
