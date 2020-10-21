import React from 'react';
import './App.css';
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

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
