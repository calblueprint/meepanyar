import React from 'react';
import './App.css';
import Inventory from './screens/Inventory';
import Home from './screens/Home';
import Incidents from './screens/Incidents';
import Maintenance from './screens/Maintenance';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { history, RootState } from './lib/redux/store';
import LabelBottomNavigation from './components/BaseComponents/BottomNav';
import Login from './screens/Login';
import CustomerMain from './screens/Customers/CustomerMain';
import CustomerProfile from './screens/Customers/CustomerProfile';
import CustomerRecords from './screens/Customers/CustomerRecords';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { theme } from './styles/ThemeStyles';

interface AppProps {
  isSignedIn: boolean;
}

function App(isSignedIn: AppProps) {
  const homeRedirect = isSignedIn ? '/home' : '/login';

  return (
    <div className="App">
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <LabelBottomNavigation />
            <Switch>
              <Route exact path="/" history={history}>
                <Redirect to={homeRedirect} />
              </Route>
              <Route path="/home" component={Home} />
              <Route path="/customers" exact component={CustomerMain} />
              <Route path="/inventory" component={Inventory} />
              <Route path="/maintenance" component={Maintenance} />
              <Route path="/incidents" component={Incidents} />
              <Route path="/login" history={history} component={Login} />
              <Route path={'/customers/:rid'} exact component={CustomerProfile} />
              <Route path={'/customers/:rid/records'} component={CustomerRecords} />
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  isSignedIn: state.userData.user !== null,
});

export default connect(mapStateToProps)(App);
