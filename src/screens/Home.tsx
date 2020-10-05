import React from "react";
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

const topBarS = {
    text: {
        textAlign: 'center'
    },
    background: 'orange',
    height: '70px',
    width: '100%%',
};

class Home extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light sticky-top" role="navigation">
                    <div className="container-fluid" style={topBarS}>
                        <div className="navbar-home">
                            <header>
                                <h1>Home</h1>
                            </header>
                        </div>
                        <Nav className="ml-auto">
                            <NavItem>
                            <NavLink to="/search" className="nav-link">
                                Search
                            </NavLink>
                            </NavItem>
                            <NavItem>
                            <NavLink to="/login" className="nav-link">
                                Login
                            </NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                </nav>
        )
    }
};

export default Home;