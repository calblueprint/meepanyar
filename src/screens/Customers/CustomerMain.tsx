import React, { useEffect, useState } from 'react';
import { CustomerRecord, SiteRecord } from '../../utils/airtable/interface';
import { Link, RouteComponentProps } from 'react-router-dom';
import { store } from '../../lib/redux/store';
import { createStyles, FormControl, FormHelperText, MenuItem, Select, Theme, withStyles } from '@material-ui/core';
import UserSearchBar from '../../components/UserSearchBar';
import CustomerCard from '../../components/CustomerCard';

const TrieSearch = require('trie-search');

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
      paddingTop: '86px',
      paddingRight: '21px',
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

interface UserProps {
  classes: { title: string; headerWrapper: string; selectionHeader: string; scrollDiv: string };
}

let MockCustomers = [
  { name: 'jen', outstandingBalance: '5' },
  { name: 'emma', outstandingBalance: '6' },
  { name: 'tiff', outstandingBalance: '7' },
  { name: 'jul', outstandingBalance: '9' },
]

function CustomerMain(props: RouteComponentProps & UserProps) {
  useEffect(() => {
    getCustomers();
  }, []);

  const { classes } = props;
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [fullCustomers, setFullCustomers] = useState<CustomerRecord[]>([]);
  const trie = new TrieSearch('name');

  const getCustomers = () => {
    let siteData = store.getState().siteData;
    let sites: SiteRecord[] = siteData.sites;
    let allCustomers: CustomerRecord[] = []
    for (let i = 0; i < sites.length; i++) {
      let currCustomers: CustomerRecord[] = sites[i].customers;
      allCustomers = allCustomers.concat(currCustomers)
    }
    console.log(allCustomers);
    setCustomers(allCustomers);
    setFullCustomers(allCustomers)
    trie.addAll(allCustomers);
  }

  const handleSearchChange = (e: any) => {
    const searchVal = e.target.value.trim();
    if (searchVal === '') {
      setCustomers(fullCustomers);
      return;
    }
    const customers = trie.get(searchVal);
    console.log(customers)
    setCustomers(customers);
  }

  return (
    <div>
      <div className={classes.headerWrapper}>
        <h1 className={classes.title}>Customers</h1>
        <div className={classes.selectionHeader}>
          <UserSearchBar searchFun={handleSearchChange} />
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
        {customers.map((customer, index) => (
          <Link key={index} to={{ pathname: `${props.match.url}/${customer.name}`, state: { customer: customer } }}>
            <CustomerCard name={customer.name} amount={customer.outstandingBalance} date={"December 10"} />
          </Link>
        ))
        }
      </div>
    </div>
  );

}

export default withStyles(styles)(CustomerMain);
