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
      paddingLeft: '21px',
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
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerRecord[]>([]);
  const [allCustomersTrie, setAllCustomersTrie] = useState<TrieTree<CustomerRecord>>(new TrieTree('name'));

  const getCustomers = () => {
    const siteData = store.getState().siteData.currentSite;
    let allCustomers: CustomerRecord[] = siteData.customers;
    setFilteredCustomers(allCustomers);
    const customersTrie: TrieTree<CustomerRecord> = new TrieTree('name');
    customersTrie.addAll(allCustomers);
    setAllCustomersTrie(customersTrie);

  }

  const getLatestReadingDate = (customer: CustomerRecord) => {
    //depends if the meter readings list is sorted with earliest => latest
    if (customer.meterReadings.length > 0) {
      let latestMeterReading = customer.meterReadings[customer.meterReadings.length - 1]
      const dateTime = Date.parse(latestMeterReading.date)
      let readingDate = new Date(dateTime)
      let month = readingDate.getMonth() + 1;
      let day = readingDate.getDate();
      let shortDate = month.toString() + '.' + day.toString();
      return shortDate;
    } else {
      return 'No Readings'
    }
  }

  const handleSearchChange = (e: any) => {
    const searchVal = e.target.value.trim();
    const customers = allCustomersTrie.get(searchVal);
    setFilteredCustomers(customers);
  }
  return (
    <div>
      <div className={classes.headerWrapper}>
        <h1 className={classes.title}>Customers</h1>
        <div className={classes.selectionHeader}>
          <UserSearchBar searchFun={handleSearchChange} />
          <FormControl>
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
      <div className={classes.scrollDiv}>
        {filteredCustomers.map((customer, index) => (
          <Link key={index} to={{ pathname: `${props.match.url}/${customer.name}`, state: { customer: customer } }}>
            <CustomerCard name={customer.name} amount={customer.outstandingBalance} date={getLatestReadingDate(customer)} active={customer.isactive} />
          </Link>
        ))
        }
      </div>
    </div>
  );

}

export default withStyles(styles)(CustomerMain);
