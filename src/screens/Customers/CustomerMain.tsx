import { createStyles, Fab, FormControl, FormHelperText, ListSubheader, MenuItem, Select, Theme, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import CustomerCard from '../../components/CustomerCard';
import SearchBar from '../../components/SearchBar';
import { CustomerRecord } from '../../lib/airtable/interface';
import { setCurrentCustomerIdInRedux } from '../../lib/redux/customerData';
import { getLatestReadingDate } from '../../lib/utils/customerUtils';
import { selectAllCustomersArray } from '../../lib/redux/customerDataSlice';
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
    rightAlign: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(1),
      right: theme.spacing(2),
      color: 'white',
    },
  });

interface CustomerMainProps extends RouteComponentProps {
  classes: { title: string; headerWrapper: string; selectionHeader: string; rightAlign: string; fab: string; };
  customers: CustomerRecord[]
}

enum SortBy {
  NAME = 'Name (A - Z)' as any,
  METER = 'Meter Number' as any
}

enum FilterBy {
  PAYMENT_STATUS = 'Payment Status' as any,
  METER_STATUS = 'Meter Status' as any,
  ACTIVE_STATUS = 'Active Status' as any,
}

type FilterByLabel = Record<keyof typeof FilterBy, string[]>;

const labels: FilterByLabel = {
  'PAYMENT_STATUS': ['Unpaid', 'Paid'],
  'METER_STATUS': ['Has Meter', 'No Meter'],
  'ACTIVE_STATUS': ['Active', 'Inactive']
}

function CustomerMain(props: CustomerMainProps) {
  const { classes } = props;
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerRecord[]>([]);
  const [filteredCustomersAlt, setFilteredCustomersAlt] = useState<CustomerRecord[]>([]);
  const [allCustomersTrie, setAllCustomersTrie] = useState<TrieTree<CustomerRecord>>(new TrieTree('name'));
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NAME);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ACTIVE_STATUS);
  const [sortAndFilter, setSortAndFilter] = useState<string[]>([])
  const [filterLabels, setFilterLabels] = useState<string[]>(labels["ACTIVE_STATUS"]);
  const [searchValue, setSearchValue] = useState<string>("");
  const fullCustomers: CustomerRecord[] = useSelector(selectAllCustomersArray) || [];

  useEffect(() => {
    getCustomers();
    setSortAndFilter([SortBy[sortBy], FilterBy[filterBy]]);
  }, [sortBy, filterBy, searchValue]);

  const getCustomers = () => {
    let allCustomers = fullCustomers;

    if (searchValue !== '') {
      allCustomers = allCustomersTrie.get(searchValue);
    }
    allCustomers.sort(sortByFunction);
    sortAndFilterCustomers(allCustomers);
    const customersTrie: TrieTree<CustomerRecord> = new TrieTree('name');
    customersTrie.addAll(allCustomers);
    setAllCustomersTrie(customersTrie);
  }

  const sortAndFilterCustomers = (customers: CustomerRecord[]) => {
    const groupA = customers.filter(filterByFunction);
    const groupB = customers.filter((customer: CustomerRecord) => !filterByFunction(customer));
    setFilteredCustomers(groupA);
    setFilteredCustomersAlt(groupB);
  }

  /**
   * Comparator function for sorting two customer records.
   * It is conditioned by the current user selection for sorting.
   */
  const sortByFunction = (customerA: CustomerRecord, customerB: CustomerRecord): number => {
    switch (sortBy) {
      case (SortBy.METER): {
        return customerA.meterNumber - customerB.meterNumber;
      }
      case (SortBy.NAME): {
        return customerA.name.localeCompare(customerB.name)
      }
      default: {
        return 0
      }
    }
  }

  /**
   * Comparator function for filtering customer records.
   * It is conditioned by the current user selection for filtering.
   */
  const filterByFunction = (customer: CustomerRecord): boolean => {
    switch (filterBy) {
      case (FilterBy.METER_STATUS): {
        return customer.hasmeter
      }
      case (FilterBy.PAYMENT_STATUS): {
        return customer.outstandingBalance > 0
      }
      case (FilterBy.ACTIVE_STATUS): {
        return customer.isactive
      }
      default: {
        return true;
      }
    }
  }

  const handleSearchChange = (e: any) => {
    const searchVal = e.target.value.trim();
    setSearchValue(searchVal);
  }

  /**
   * onPressHandler for selecting sortBy and filterBy attributes.
   *
   * NOTE: For a multi-select, event.target.value returns an array, rather than a string.
   * The first two lines in this function extract the new selected option, then sets the
   * state variable accordingly. Source: https://material-ui.com/components/selects/#multiple-select
   */
  const handleMenuSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedOptions: string[] = event.target.value as string[];
    const newlySelectedOption: string = selectedOptions[selectedOptions.length - 1];

    const sortByKeys: string[] = Object.keys(SortBy);
    if (sortByKeys.includes(newlySelectedOption)) {
      setSortBy(SortBy[newlySelectedOption as keyof typeof SortBy]);
      return;
    }

    const filterByKeys: string[] = Object.keys(FilterBy);
    if (filterByKeys.includes(newlySelectedOption)) {
      setFilterBy(FilterBy[newlySelectedOption as keyof typeof FilterBy]);
      setFilterLabels(labels[newlySelectedOption as keyof typeof FilterBy]);
      return;
    }
  }

  return (
    <BaseScreen rightIcon="user">
      <div className={classes.headerWrapper}>
        <h1 className={classes.title}>Customers</h1>
      </div>
      <div className={classes.selectionHeader}>
        <SearchBar placeholder="Search for a customer" onSearchChange={handleSearchChange} />
        <FormControl>
          <Select onChange={handleMenuSelect} multiple value={sortAndFilter} inputProps={{ 'aria-label': 'Without label' }}>
            <ListSubheader>Sort By</ListSubheader>
            <MenuItem value="NAME">{SortBy.NAME}</MenuItem>
            <MenuItem value="METER">{SortBy.METER}</MenuItem>
            <ListSubheader>Filter By</ListSubheader>
            <MenuItem value="PAYMENT_STATUS">{FilterBy.PAYMENT_STATUS}</MenuItem>
            <MenuItem value="METER_STATUS">{FilterBy.METER_STATUS}</MenuItem>
            <MenuItem value="ACTIVE_STATUS">{FilterBy.ACTIVE_STATUS}</MenuItem>
          </Select>
          <div className={classes.rightAlign}><FormHelperText>Sort and Filter</FormHelperText></div>
        </FormControl>
      </div>
      <BaseScrollView>
        <FormHelperText>{filterLabels[0]}</FormHelperText>
        {filteredCustomers.map((customer, index) => (
          <Link key={index} to={`${props.match.url}/customer`} onClick={() => setCurrentCustomerIdInRedux(customer.id)} >
            <CustomerCard name={customer.name} amount={customer.outstandingBalance.toString()} date={getLatestReadingDate(customer)} active={customer.isactive} />
          </Link>
        ))
        }
        <FormHelperText>{filterLabels[1]}</FormHelperText>
        {filteredCustomersAlt.map((customer, index) => (
          <Link key={index} to={`${props.match.url}/customer`} onClick={() => setCurrentCustomerIdInRedux(customer.id)} >
            <CustomerCard name={customer.name} amount={customer.outstandingBalance.toString()} date={getLatestReadingDate(customer)} active={customer.isactive} />
          </Link>
        ))
        }
      </BaseScrollView>
      <Link to={'/customers/create'}>
        <Fab color='primary' aria-label='add customer' className={classes.fab} size='medium'>
          <AddIcon fontSize="large" />
        </Fab>
      </Link>
    </BaseScreen>
  );

}

export default withStyles(styles)(CustomerMain);
