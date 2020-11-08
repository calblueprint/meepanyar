<<<<<<< HEAD
import React from "react";
import CustomerCards from "../components/CustomerCard"
import * as Styles from "../styles/UserStyle";
import UserSearchBar from "../components/UserSearchBar"
import CustomerCard from "../components/CustomerCard";
import { FormControl, FormHelperText, MenuItem, Select } from "@material-ui/core";

let MockCustomers = [
    { name: 'jen', amount: '5' },
    { name: 'emma', amount: '6' },
    { name: 'tiff', amount: '7' },
    { name: 'jul', amount: '9' },
]

interface UserState {
    customers: Array<CustomerRecord>;
    trie: any;
}

interface CustomerRecord {
    name: string;
    amount: string;
}

var TrieSearch = require('trie-search');
var ts = new TrieSearch();
class User extends React.Component<{}, UserState> {

    constructor(props: {}) {
        super(props)
        this.state = {
            customers: MockCustomers,
            trie: null
        }
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }


    componentDidMount() {
        let customers: Array<CustomerRecord> = this.state.customers;
        const trie = new TrieSearch('name');
        trie.addAll(customers);
        this.setState({
            trie,
        });
    }

    handleSearchChange(e: any) {
        const searchVal = e.target.value.trim();
        if (searchVal === '') {
            this.setState({
                customers: MockCustomers,
            });
            return;
        }
        const customers = this.state.trie.get(searchVal);
        this.setState({
            customers,
        });
    }


    render() {
        let today = new Date()
        let customers = this.state.customers;
        return (
            <div>
                <Styles.HeaderWrapper>
                    <Styles.Title>Customers</Styles.Title>
                    <Styles.SelectionHeader>
                        <UserSearchBar searchFun={this.handleSearchChange} />
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

=======
import React from 'react';

class User extends React.Component {
  render() {
    return <h4>This is the user screen</h4>;
  }
}

>>>>>>> main
export default User;
