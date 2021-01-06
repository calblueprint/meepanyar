import React, { useEffect, useState } from 'react';
import { CustomerRecord, SiteRecord } from '../../lib/airtable/interface';
import { Link, RouteComponentProps } from 'react-router-dom';
import { store } from '../../lib/redux/store';
import { createStyles, FormControl, FormHelperText, MenuItem, Select, Theme, withStyles } from '@material-ui/core';
import UserSearchBar from '../../components/UserSearchBar';
import CustomerCard from '../../components/CustomerCard';
import TrieTree from '../../lib/utils/TrieTree';

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

function CustomerMain(props: RouteComponentProps & UserProps) {
  useEffect(() => {
    getCustomers();
  }, []);

  const { classes } = props;
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [allCustomersTrie, setAllCustomersTrie] = useState<TrieTree<CustomerRecord>>(new TrieTree('name'));
  const [fullCustomers, setFullCustomers] = useState<CustomerRecord[]>([]);

  const getCustomers = () => {
    const siteData = store.getState().siteData;
    const sites: SiteRecord[] = siteData.sites;
    let allCustomers: CustomerRecord[] = [];
    for (let i = 0; i < sites.length; i++) {
      let currCustomers: CustomerRecord[] = sites[i].customers;
      allCustomers = allCustomers.concat(currCustomers)
    }
    setCustomers(allCustomers);
    setFullCustomers(allCustomers);

    const customersTrie: TrieTree<CustomerRecord> = new TrieTree('name');
    customersTrie.addAll(allCustomers);
    setAllCustomersTrie(customersTrie);

  }

  const handleSearchChange = (e: any) => {
    const searchVal = e.target.value.trim();
    if (searchVal === '') {
      setCustomers(fullCustomers);
      return;
    }
    const customers = allCustomersTrie.get(searchVal);
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
            <CustomerCard name={customer.name} amount={customer.outstandingBalance} date={"11.15"} />
          </Link>
        ))
        }
      </div>
    </div>
  );

}

export default withStyles(styles)(CustomerMain);
