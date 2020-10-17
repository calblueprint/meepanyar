import React from "react";
//import { Nav, NavItem} from 'reactstrap';
//import { NavLink } from 'react-router-dom';

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
            title:'Home',
            headerTitleStyle:{
                fontSize: 25,
                textAlign: 'center',
                flex: 1,
                color: 'white',
            },
            headerStyle:{
                backgroundColor: '#fc6f03',
                borderBottomColor: 'transparent',
            },
    };
    render() {
        return (
            <div className='container-fluid' style={topBarS}>
                <header>
                    <h1 style={{ color: 'white' }}>Home</h1>
                </header>
            </div>
        )
    }
};

export default Home;
