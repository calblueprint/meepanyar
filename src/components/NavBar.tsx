import React from 'react';
import { Link } from 'react-router-dom';

const topBarS = {
  background: 'orange',
  height: '50px',
  width: '100%%',
};

class Navbar extends React.Component {
  render() {
    return (
      <div className="NavBar" style={topBarS}>
        <div>
          <Link to="" className="item">
            Home
          </Link>
        </div>
        <div>
          <Link to="/about" className="item">
            About
          </Link>
        </div>
        <div>
          <Link to="/other" className="item">
            Other
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
