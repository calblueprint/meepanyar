import React from 'react';
//import logo from './logo.svg';
import './App.css';
// import Navigation from './components/Navigation';
import User from './screens/User';
import Shopping from './screens/Shopping';
import Home from './screens/Home';
import Errors from './screens/Errors';
import Tools from './screens/Tools';
import SubmittedRecords from './screens/SubmittedRecords';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SearchNavBar from './components/SearchNavBar';
import LabelBottomNavigation from './components/BottomNav';

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
          <Route path="/records" component={SubmittedRecords} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  isSignedIn: state.userData.user !== null,
});

export default connect(mapStateToProps)(App);
