import { FormControl, FormHelperText, MenuItem, Select } from "@material-ui/core";
import React from "react";
//import { Nav, NavItem} from 'reactstrap';
//import { NavLink } from 'react-router-dom';
import Menu from "../components/HamburgerMenu";


class Home extends React.Component {

    render() {
        return (
            <div><FormControl >
                <Select
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem>Site Name</MenuItem>
                    <MenuItem>Site Name</MenuItem>
                    <MenuItem value={30}>Site Name</MenuItem>
                </Select>
            </FormControl></div>
        )
    }
};

export default Home;