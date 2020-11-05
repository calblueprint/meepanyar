import React from "react";
import CustomerCards from "../components/CustomerCard"
import * as Styles from "../styles/UserStyle";
import UserSearchBar from "../components/UserSearchBar"
import CustomerCard from "../components/CustomerCard";
import { FormControl, FormHelperText, MenuItem, Select } from "@material-ui/core";

let customers = [
    { name: 'jen', amount: 5 },
    { name: 'emma', amount: 6 },
    { name: 'tiff', amount: 7 },
    { name: 'jul', amount: 9 },
]
class User extends React.Component {


    render() {
        let today = new Date()
        return (
            <div>
                <Styles.HeaderWrapper>
                    <Styles.Title>Customers</Styles.Title>
                    <Styles.SelectionHeader>
                        <UserSearchBar name='hi' />
                        <FormControl >
                            <Select
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            <FormHelperText>Sort By</FormHelperText>
                        </FormControl>
                    </Styles.SelectionHeader>
                </Styles.HeaderWrapper>
                <Styles.ScrollDiv>
                    {customers.map(cus => (
                        <CustomerCard name={cus.name} amount={cus.amount} date={today.toDateString()} />
                    ))}
                </Styles.ScrollDiv>
            </div>
        )
    }
};

export default User;
