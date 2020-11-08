import React from 'react';
import './App.css';
<<<<<<< HEAD
import Navigation from './components/Navigation';
import User from './screens/User';
import Shopping from './screens/Shopping';
import Home from './screens/Home';
import Errors from './screens/Errors';
import Tools from './screens/Tools';
import Login from './screens/Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from './styles/ThemeStyles'
=======
import User from './screens/User';
import Inventory from './screens/Inventory';
import Home from './screens/Home';
import Incidents from './screens/Incidents';
import Maintenance from './screens/Maintenance';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LabelBottomNavigation from './components/BottomNav';
import Login from './screens/Login';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './styles/ThemeStyles';
>>>>>>> main

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/user" component={User}/>
          <Route path="/shopping" component={Shopping}/>
          <Route path="/tools" component={Tools}/>
          <Route path="/errors" component={Errors}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </BrowserRouter>
      </ThemeProvider>
=======
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
            </Switch>
          </BrowserRouter>
        </ThemeProvider>
      </StylesProvider>
>>>>>>> main
    </div>
  );
}

export default App;
