import { createStyles, Fab, FormControl, FormHelperText, MenuItem, Select, Theme, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import CustomerCard from '../../components/CustomerCard';
import UserSearchBar from '../../components/UserSearchBar';
import { CustomerRecord } from '../../lib/airtable/interface';
import { store } from '../../lib/redux/store';
import TrieTree from '../../lib/utils/TrieTree';


const styles = (theme: Theme) =>
  createStyles({
    title: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: theme.typography.h1.fontWeight,
      fontSize: theme.typography.h1.fontSize,
      lineHeight: '115%',
      color: '#828282',
      flexGrow: 1,
      paddingRight: '20px',
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
    fab: {
      position: 'absolute',
      bottom: theme.spacing(1),
      right: theme.spacing(2),
      color: 'white',
    },
  });

interface UserProps {
  classes: { title: string; headerWrapper: string; selectionHeader: string; fab: string; };
}

function CustomerMain(props: RouteComponentProps & UserProps) {
  useEffect(() => {
    getCustomers();
  }, []);

  const { classes } = props;
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerRecord[]>([]);
  const [fullCustomers, setFullCustomers] = useState<CustomerRecord[]>([]);
  const [allCustomersTrie, setAllCustomersTrie] = useState<TrieTree<CustomerRecord>>(new TrieTree('name'));

  const getCustomers = () => {
    const siteData = store.getState().siteData.currentSite;
    const allCustomers: CustomerRecord[] = siteData.customers;
    setFilteredCustomers(allCustomers);
    setFullCustomers(allCustomers);
    const customersTrie: TrieTree<CustomerRecord> = new TrieTree('name');
    customersTrie.addAll(allCustomers);
    setAllCustomersTrie(customersTrie);

  }

  const getLatestReadingDate = (customer: CustomerRecord) => {
    //depends if the meter readings list is sorted with earliest => latest
    if (customer.meterReadings.length > 0) {
      const latestMeterReading = customer.meterReadings[customer.meterReadings.length - 1]
      const dateTime = Date.parse(latestMeterReading.date)
      const readingDate = new Date(dateTime)
      const month = readingDate.getMonth() + 1;
      const day = readingDate.getDate();
      const shortDate = month.toString() + '.' + day.toString();
      return shortDate;
    } else {
      return 'No Readings'
    }
  }

  const handleSearchChange = (e: any) => {
    const searchVal = e.target.value.trim();
    if (searchVal === '') {
      setFilteredCustomers(fullCustomers);
      return;
    }
    const customers = allCustomersTrie.get(searchVal);
    setFilteredCustomers(customers);
  }

  return (
    <BaseScreen rightIcon="user">
      <div className={classes.headerWrapper}>
        <h1 className={classes.title}>Customers</h1>
        <div className={classes.selectionHeader}>
          <UserSearchBar onSearchChange={handleSearchChange} />
          <FormControl >
            <Select inputProps={{ 'aria-label': 'Without label' }}>
              {/* placeholder sorting for now */}
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <FormHelperText>Sort By</FormHelperText>
          </FormControl>
        </div>
      </div>
      <Fab href="/customers/create" color='primary' aria-label='add customer' className={classes.fab} size='medium'>
        <AddIcon fontSize="large"/>
      </Fab>
      <BaseScrollView>
        {filteredCustomers.map((customer, index) => (
          <Link key={index} to={{ pathname: `${props.match.url}/customer`, state: { customer: customer } }}>
            <CustomerCard name={customer.name} amount={customer.outstandingBalance} date={getLatestReadingDate(customer)} active={customer.isactive} />
          </Link>
        ))
        }
      </BaseScrollView>
    </BaseScreen>
  );

}

export default withStyles(styles)(CustomerMain);
