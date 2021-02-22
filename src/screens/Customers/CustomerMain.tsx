import React, { useEffect, useState } from 'react';
import { CustomerRecord } from '../../lib/airtable/interface';
import { Link, RouteComponentProps } from 'react-router-dom';
import { store } from '../../lib/redux/store';
import { createStyles, FormControl, FormHelperText, MenuItem, Select, Theme, ThemeProvider, withStyles } from '@material-ui/core';
import UserSearchBar from '../../components/UserSearchBar';
import CustomerCard from '../../components/CustomerCard';
import TrieTree from '../../lib/utils/TrieTree';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';

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
  });

interface UserProps {
  classes: { title: string; headerWrapper: string; selectionHeader: string; };
}

enum SortBy {
  name = 'Name (A - Z)' as any, 
  meter = 'Meter Number' as any
}

function CustomerMain(props: RouteComponentProps & UserProps) {
  const { classes } = props;
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerRecord[]>([]);
  const [fullCustomers, setFullCustomers] = useState<CustomerRecord[]>([]);
  const [allCustomersTrie, setAllCustomersTrie] = useState<TrieTree<CustomerRecord>>(new TrieTree('name'));
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.name); 

  useEffect(() => {
    getCustomers();
  }, [sortBy]);

  const getCustomers = () => {
    const siteData = store.getState().siteData.currentSite;
    const allCustomers: CustomerRecord[] = siteData.customers;
    allCustomers.sort(sortByFunction())
    setFilteredCustomers(allCustomers);
    setFullCustomers(allCustomers);
    const customersTrie: TrieTree<CustomerRecord> = new TrieTree('name');
    customersTrie.addAll(allCustomers);
    setAllCustomersTrie(customersTrie);
  }

  const sortByFunction = (): (a: CustomerRecord, b: CustomerRecord) => number => {
    switch (sortBy) {
      case (SortBy.meter): {
        return (a: CustomerRecord, b: CustomerRecord) => { return a.meterNumber - b.meterNumber }
      }
      default: {
        return (a: CustomerRecord, b: CustomerRecord) => { return a.name.localeCompare(b.name) }
      }
    }
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

  const handleSortByChange = (e: any) => {
    const key: keyof typeof SortBy = e.target.value; 
    setSortBy(SortBy[key]);
  }

  return (
    <BaseScreen rightIcon="user">
      <div className={classes.headerWrapper}>
        <h1 className={classes.title}>Customers</h1>
        <div className={classes.selectionHeader}>
          <UserSearchBar onSearchChange={handleSearchChange} />
          <FormControl >
            <Select onChange={handleSortByChange} value={SortBy[sortBy]} inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="name">{SortBy.name}</MenuItem>
              <MenuItem value="meter">{SortBy.meter}</MenuItem>
            </Select>
            <FormHelperText>Sort By</FormHelperText>
          </FormControl>
        </div>
      </div>
      <BaseScrollView>
        {filteredCustomers.map((customer, index) => (
          <Link key={index} to={{ pathname: `${props.match.url}/${customer.name}`, state: { customer: customer } }}>
            <CustomerCard name={customer.name} amount={customer.outstandingBalance} date={getLatestReadingDate(customer)} active={customer.isactive} />
          </Link>
        ))
        }
      </BaseScrollView>
    </BaseScreen>
  );

}

export default withStyles(styles)(CustomerMain);
