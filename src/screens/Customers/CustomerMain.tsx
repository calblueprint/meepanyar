import { Typography, createStyles, Fab, Theme, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { CustomerRecord } from '../../lib/airtable/interface';
import { getLatestReadingDate } from '../../lib/utils/customerUtils';
import { selectAllCustomersArray } from '../../lib/redux/customerDataSlice';
import TrieTree from '../../lib/utils/TrieTree';
import { selectCustomersToMeter, selectCustomersToCollect, selectCustomersDone } from '../../lib/redux/customerData';
import CustomersTabMenu, { CustomerMenu } from './components/CustomersTabMenu';

const styles = (theme: Theme) =>
  createStyles({
    title: {
      color: theme.palette.text.primary,
      flexGrow: 1,
    },
    headerWrapper: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      marginTop: '-55px',
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(1),
      right: theme.spacing(2),
      color: 'white',
    },
    searchIcon: {
      color: theme.palette.text.secondary,
      marginRight: '40px',
    },
    searchBar: {
      zIndex: 1,
      position: 'absolute',
      marginTop: '-20px',
      width: '90%',
      height: '20px',
      backgroundColor: 'white',
    },
  });

interface CustomerMainProps extends RouteComponentProps {
  classes: { title: string; headerWrapper: string; fab: string; searchIcon: string; searchBar: string; };
  customers: CustomerRecord[]
}

function CustomerMain(props: CustomerMainProps) {
  const { classes } = props;

  const [allCustomersTrie, setAllCustomersTrie] = useState<TrieTree<CustomerRecord>>(new TrieTree('name'));
  const [searchValue, setSearchValue] = useState<string>("");

  const allCustomers = useSelector(selectAllCustomersArray) || [];
  const toMeterCustomers = useSelector(selectCustomersToMeter) || [];
  const toCollectCustomers = useSelector(selectCustomersToCollect) || [];
  const customersDone = useSelector(selectCustomersDone) || [];

  const defaultCustomers: CustomerMenu = {
    all: allCustomers || [],
    toMeter: toMeterCustomers || [],
    toCollect: toCollectCustomers || [],
    done: customersDone || [],
  }
  const [customers, setCustomers] = useState<CustomerMenu>(defaultCustomers);

  //initial setup of trie
  useEffect(() => {
    const customersTrie: TrieTree<CustomerRecord> = new TrieTree('name');
    customersTrie.addAll(allCustomers);
    setAllCustomersTrie(customersTrie);
  }, [])

  //updates after every character typed
  useEffect(() => {
    getCustomers();
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = e.target.value.trim();
    setSearchValue(searchVal);
  }

  const getCustomers = () => {
    if (searchValue !== '') {
      const currentCustomers = allCustomersTrie.get(searchValue);
      const newCustomers: CustomerMenu = {
        all: currentCustomers,
        toMeter: customers.toMeter.filter((customer: CustomerRecord) => currentCustomers.includes(customer)),
        toCollect: customers.toCollect.filter((customer: CustomerRecord) => currentCustomers.includes(customer)),
        done: customers.done.filter((customer: CustomerRecord) => currentCustomers.includes(customer)),
      }
      setCustomers(newCustomers);
    } else {
      setCustomers(defaultCustomers);
    }
  }

  const exitSearch = () => {
    setSearchValue("");
    setCustomers(defaultCustomers);
  }

  return (
    <BaseScreen rightIcon="user" title="Customers" searchAction={handleSearchChange} searchExit={exitSearch}>
      <CustomersTabMenu customers={customers} url={props.match.url} />
      <Link to={'/customers/create'}>
        <Fab color='primary' aria-label='add customer' className={classes.fab} size='medium'>
          <AddIcon fontSize="large" />
        </Fab>
      </Link>
    </BaseScreen>
  );
}

export default withStyles(styles)(CustomerMain);
