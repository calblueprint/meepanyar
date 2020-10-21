import React from 'react';
import './App.css';
import User from './screens/User';
import Shopping from './screens/Shopping';
import Home from './screens/Home';
import Errors from './screens/Errors';
import Tools from './screens/Tools';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SearchNavBar from './components/SearchNavBar';
import LabelBottomNavigation from './components/BottomNav';

function App() {
  return (
    <div className="App">
      <SearchNavBar />
      <BrowserRouter>
      <LabelBottomNavigation />
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/customers" component={User}/>
          <Route path="/inventory" component={Shopping}/>
          <Route path="/maintenance" component={Tools}/>
          <Route path="/incidents" component={Errors}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
