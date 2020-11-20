import React from 'react';
import CustomerCards from '../components/CustomerCard';
import useStyles from '../styles/UserStyle';
import UserSearchBar from '../components/UserSearchBar';
import CustomerCard from '../components/CustomerCard';
import { FormControl, FormHelperText, MenuItem, Select } from '@material-ui/core';
import { getAllCustomerUpdates, getAllSites, getCustomersByIds, getSiteById } from '../utils/airtable/requests';
import { CustomerRecord, SiteRecord } from '../utils/airtable/interface';

interface UserState {
  customers: Array<CustomerRecord> | null;
  trie: any;
  fullCustomers: Array<CustomerRecord> | null;
}

// eslint-ignore
//const TrieSearch = require('trie-search'); // eslint-disable-line no-eval
const ts = new TrieSearch();

class User extends React.Component<{}, UserState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      customers: null,
      trie: null,
      fullCustomers: null,
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  async getCustomers() {
    const sites: SiteRecord[] = await getAllSites();
    const customers: CustomerRecord[] = await getCustomersByIds(sites[0].customerIds);
    console.log(customers);
    const trie = new TrieSearch('name');
    trie.addAll(customers);
    this.setState({
      customers: customers,
      trie: trie,
      fullCustomers: customers,
    });
  }

  componentDidMount() {
    this.getCustomers();
  }

  handleSearchChange(e: any) {
    const searchVal = e.target.value.trim();
    if (searchVal === '') {
      this.setState({
        customers: this.state.fullCustomers,
      });
      return;
    }
    const customers = this.state.trie.get(searchVal);
    this.setState({
      customers,
    });
  }

  // renderCustomerCards() {
  //   const customers = this.state.customers;
  //   if (customers) {
  //     return (
  //       customers.map((cus) => (
  //         <CustomerCard name={cus.name} amount={cus.} date={cus.} />
  //       ))
  //     );
  //   }
  // }

  render() {
    const today = new Date();
    const customers = this.state.customers;
    const classes = useStyles();
    return (
      <div>
        <div className={classes.headerWrapper}>
          <h1 className={classes.title}>Customers</h1>
          <div className={classes.selectionHeader}>
            <UserSearchBar searchFun={this.handleSearchChange} />
            <FormControl>
              <Select inputProps={{ 'aria-label': 'Without label' }}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Sort By</FormHelperText>
            </FormControl>
          </div>
        </div>
        <div className={classes.scrollDiv}>
          {/* {customers.map((cus) => (
            <CustomerCard name={cus.name} amount={cus.amount} date={today.toDateString()} />
          ))} */}
          <CustomerCard name={'hi'} amount={'4'} date={'hi'} />
        </div>
      </div>
    );
  }
}

export default User;
