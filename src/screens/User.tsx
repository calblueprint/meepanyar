import React, { useEffect, useState } from 'react';
import CustomerCards from '../components/CustomerCard';
import useStyles from '../styles/UserStyle';
import UserSearchBar from '../components/UserSearchBar';
import CustomerCard from '../components/CustomerCard';
import { createStyles, FormControl, FormHelperText, MenuItem, Select, Theme, withStyles } from '@material-ui/core';
import {  getAllSites, getCustomersByIds, getSiteById } from '../utils/airtable/requests';
import { CustomerRecord, SiteRecord } from '../utils/airtable/interface';
import { RouteComponentProps } from 'react-router-dom';

// // eslint-ignore
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

function User(props: UserProps) {
  useEffect(() => {
    getCustomers();
  }, []);
  const { classes } = props;
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [fullCustomers, setFullCustomers] = useState<CustomerRecord[]>([]);
  const trie = new TrieSearch('name');

  const handleSearchChange = (e: any) => {
    const searchVal = e.target.value.trim();
    if (searchVal === '') {
      setCustomers(fullCustomers);
      return;
    }
    const customers = trie.get(searchVal);
    setCustomers(customers);
  }

  const getCustomers = async () => {
    const sites: SiteRecord[] = await getAllSites();
    const customers: CustomerRecord[] = await getCustomersByIds(sites[0].customerIds);
    console.log(customers);
    trie.addAll(customers);
    setCustomers(customers);
  };

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
        {/* {customers.map((cus) => (
          <CustomerCard name={cus.name} amount={cus.amount} date={today.toDateString()} />
        ))} */}
        <CustomerCard name={'hi'} amount={'4'} date={'hi'} />
      </div>
    </div>
  );
}

export default withStyles(styles)(User);