import React, { useState } from 'react';
import CustomerCards from '../components/CustomerCard';
import useStyles from '../styles/UserStyle';
import UserSearchBar from '../components/UserSearchBar';
import CustomerCard from '../components/CustomerCard';
import { createStyles, FormControl, FormHelperText, MenuItem, Select, Theme, withStyles } from '@material-ui/core';
import { getAllCustomerUpdates, getAllSites, getCustomersByIds, getSiteById } from '../utils/airtable/requests';
import { CustomerRecord, SiteRecord } from '../utils/airtable/interface';
import { RouteComponentProps } from 'react-router-dom';

interface UserState {
  customers: Array<CustomerRecord> | null;
  trie: any;
  fullCustomers: Array<CustomerRecord> | null;
}

interface UserProps {
  classes: { title: string; headerWrapper: string; selectionHeader: string; scrollDiv: string; }
}

// eslint-ignore
const TrieSearch = require('trie-search'); // eslint-disable-line no-eval
const ts = new TrieSearch();
const classes = useStyles();

const styles = (theme: Theme) =>
  createStyles({
    title: {
      width: '153.9px',
      height: '33.83px',
      left: '25.6px',
      top: '96px',
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '30px',
      lineHeight: '115%',
      color: '#828282',
      flexGrow: 1,
    },
    headerWrapper: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    selectionHeader: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    scrollDiv: {
      maxHeight: '380px',
      overflow: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '310.71px',
    },
  });

class User extends React.Component<UserProps, UserState> {
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
    const customers = this.state.customers;
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

export default withStyles(styles)(User);

interface UserProps extends RouteComponentProps {
  classes: { title: string; headerWrapper: string; selectionHeader: string; scrollDiv: string; }
}

function User(props: UserProps) {
  const { classes } = props;
  // customers: null,
  //     trie: null,
  //     fullCustomers: null,
  const [customers, trie] = useState(null);
  const [fullCustomers] = useState(null);



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

