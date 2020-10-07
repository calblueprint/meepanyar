import React from "react";
//import { Nav, NavItem} from 'reactstrap';
//import { NavLink } from 'react-router-dom';
import Menu from "../components/HamburgerMenu";

const topBarS = {
    text: {
        textAlign: 'center',
        color: 'white'
    },
    background: '#fc6f03',
    height: '100px',
    width: '100%%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

class Home extends React.Component {
    static navigationOptions = {
            headerLeft: <Menu />,
            title:'Home',
            headerTitleStyle:{
                fontSize: 25,
                textAlign: 'center',
                flex: 1,
                color: 'white',
            },
            //tabBarVisible: false,
            headerStyle:{
                backgroundColor: '#fc6f03',
                borderBottomColor: 'transparent',
            },
            //headerTintColor: 'white'
    };
    render() {
        return (
            <div className='container-fluid' style={topBarS}>
                <Menu/>
                <header>
                    <h1 style={{ color: 'white' }}>Home</h1>
                </header>
            </div>
            // <nav className="navbar navbar-expand-md navbar-light sticky-top" role="navigation">
            //         <div className="container-fluid" style={topBarS}>
            //         <div className="d-flex justify-content-between">
            //             <div>
            //                 <Nav>
            //                     <NavItem>
            //                     <NavLink to="/search" className="nav-link">
            //                         Search
            //                     </NavLink>
            //                     </NavItem>
            //                 </Nav>
            //             </div>
            //                 <div className="navbar-home">
            //                     <header>
            //                         <h1 style={{ color: 'white' }}>Home</h1>
            //                     </header>
            //                 </div>
            //             <div>
            //                 <Nav>
            //                     <NavItem>
            //                     <NavLink to="/login" className="nav-link">
            //                         Login
            //                     </NavLink>
            //                     </NavItem>
            //                 </Nav>
            //             </div>
            //         </div>
            //             {/* <div className="navbar-home">
            //                 <header>
            //                     <h1 style={{ color: 'white' }}>Home</h1>
            //                 </header>
            //             </div>
            //             <Nav className="ml-auto">
            //                 <NavItem>
            //                 <NavLink to="/search" className="nav-link">
            //                     Search
            //                 </NavLink>
            //                 </NavItem>
            //                 <NavItem>
            //                 <NavLink to="/login" className="nav-link">
            //                     Login
            //                 </NavLink>
            //                 </NavItem>
            //             </Nav> */}
            //         </div>
            //     </nav>
        )
    }
};

export default Home;