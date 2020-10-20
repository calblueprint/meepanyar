import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import NavBar from './components/NavBar';
import Navigation from './components/Navigation';
import User from './screens/User';
import Shopping from './screens/Shopping';
import Home from './screens/Home';
import Errors from './screens/Errors';
import Tools from './screens/Tools';
import Login from './screens/Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
//import Menu from './components/HamburgerMenu'
//import Navbar from 'react-material-navbar';

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
