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
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LabelBottomNavigation from './components/BaseComponents/BottomNav';
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
              <Route path="/customers" exact component={CustomerMain} />
              <Route path="/inventory" component={Inventory} />
              <Route path="/maintenance" component={Maintenance} />
              <Route path="/incidents" component={Incidents} />
              <Route path="/login" component={Login} />
              <Route path="/customers/add" component={AddCustomer} />
              <Route path="/customers/meter" component={AddMeterReading} />
              <Route path={'/customers/:rid'} exact component={CustomerProfile} />
              <Route path={'/customers/:rid/records'} component={CustomerRecords} />
              <Route path={'/customers/:rid/edit'} component={EditCustomer} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
