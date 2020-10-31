import { FormControl, FormHelperText, MenuItem, Select } from "@material-ui/core";
import React from "react";
//import { Nav, NavItem} from 'reactstrap';
//import { NavLink } from 'react-router-dom';
import Menu from "../components/HamburgerMenu";
import FinancialSumCard from "../components/FinancialSumCard";
import HomeInfoCard from "../components/HomeInfo";

let MockSiteData = {
    "Julians House": {
        "customers": 2,
        "payment": 4,
        "unpaid": 0,
        "incidents": 1
    },
    "Kyles House": {
        "customers": 4,
        "payment": 2,
        "unpaid": 1,
        "incidents": 3
    },
    "Jens House": {
        "customers": 1,
        "payment": 3,
        "unpaid": 3,
        "incidents": 0
    },
}
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
            </FormControl>
                <HomeInfoCard
                    customer={"1"}
                    payment={"1"}
                    unpaid={"1"}
                    incidents={"1"}
                ></HomeInfoCard>
                <FinancialSumCard></FinancialSumCard>
            </div>
        )
    }
};

export default Home;