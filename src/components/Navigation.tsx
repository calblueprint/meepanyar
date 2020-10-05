import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench, faHome, faShoppingCart, faUser, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const tabs = [{
  route: "/home",
  icon: faHome,
  label: "Home"
},{
  route: "/user",
  icon: faUser,
  label: "User"
},{
    route: "/shopping",
    icon: faShoppingCart,
    label: "Shopping"
},{
  route: "/tools",
  icon: faWrench,
  label: "Tools"
},{
    route: "/error",
    icon: faExclamationTriangle,
    label: "Error"
  }]

class Navigation extends React.Component {
    render() {
        return (
            <div>
                <nav className="navbar fixed-bottom navbar-light bottom-tab-nav" role="navigation">
                    <Nav className="w-100">
                    <div className=" d-flex flex-row justify-content-around w-100">
                        {
                        tabs.map((tab, index) =>(
                            <NavItem key={`tab-${index}`}>
                            <NavLink to={tab.route} className="nav-link bottom-nav-link" activeClassName="active">
                                <div className="row d-flex flex-column justify-content-center align-items-center">
                                <FontAwesomeIcon size="lg" icon={tab.icon}/>
                                <div className="bottom-tab-label">{tab.label}</div>
                                </div>
                            </NavLink>
                            </NavItem>
                        ))
                        }
                    </div>
                    </Nav>
                </nav>
            </div>
        )
    }
};

export default Navigation;
