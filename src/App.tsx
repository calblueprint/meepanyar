import React from 'react';
import './App.css';
import User from './screens/User';
import Inventory from './screens/Inventory';
import Home from './screens/Home';
import Incidents from './screens/Incidents';
import Maintenance from './screens/Maintenance';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LabelBottomNavigation from './components/BottomNav';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <LabelBottomNavigation />
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/customers" component={User}/>
          <Route path="/inventory" component={Inventory}/>
          <Route path="/maintenance" component={Maintenance}/>
          <Route path="/incidents" component={Incidents}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
