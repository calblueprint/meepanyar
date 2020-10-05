import React from 'react';
//import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import About from './screens/About';
import Other from './screens/Other';
import Home from './screens/Home';
import { BrowserRouter as Router, Route} from 'react-router-dom';
//import NavbarContent from './components/NavBarContent';
//import NavbarIcon from './components/NavBarIcon';
//import Navbar from 'react-material-navbar';

function App() {
  return (
    <Router basename={}>
        <div className="App">
          <NavBar />
            <Route name="home" exact path="/" component={Home}/>
            <Route name="about" exact path="/about" component={About}/>
            <Route name="other" exact path="/other" component={Other}/>
        </div>
      </Router>
  );
}

export default App;
