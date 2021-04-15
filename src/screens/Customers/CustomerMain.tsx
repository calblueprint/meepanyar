import { Typography, createStyles, Fab, Theme, makeStyles, Tabs, Tab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { CustomerRecord } from '../../lib/airtable/interface';
import { selectAllCustomersArray } from '../../lib/redux/customerDataSlice';
import TrieTree from '../../lib/utils/TrieTree';
import { selectCustomersToMeter, selectCustomersToCollect, selectCustomersDone } from '../../lib/redux/customerData';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { TabContext, TabPanel } from '@material-ui/lab';
import CustomerCard, { CustomerStatus } from './components/CustomerCard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FlashOnIcon from '@material-ui/icons/FlashOn';

const styles = makeStyles((theme: Theme) =>
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
    tab: {
      color: `${theme.palette.divider}`,
      fontSize: '12px',
      '&:focus': {
        outline: 'none',
      },
    },
    active: {
      height: '7px',
      width: '7px',
      borderRadius: '50%',
      backgroundColor: theme.palette.secondary.light,
      marginRight: '5px',
    },
    activeContainer: {
      padding: '10px 5px',
      display: 'inline-flex',
      alignItems: 'center',
    },
    tabIcon: {
      fontSize: '15px',
    },
    tabLabel: {
      display: 'inline-flex',
    },
    tabContent: {
      marginBottom: '50px',
    },
  }));

interface CustomerMenu {
  all: CustomerRecord[];
  toMeter: CustomerRecord[];
  toCollect: CustomerRecord[];
  done: CustomerRecord[];
}

interface CustomerMainProps extends RouteComponentProps {
  customers: CustomerRecord[];
  match: any;
}

function CustomerMain(props: CustomerMainProps) {
  const classes = styles(props);
  const { match } = props;
  const [searchValue, setSearchValue] = useState<string>("");
  const [value, setValue] = React.useState('0');
  const changeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  //default customer arrays
  const allCustomers = useSelector(selectAllCustomersArray) || [];
  const toMeterCustomers = useSelector(selectCustomersToMeter) || [];
  const toCollectCustomers = useSelector(selectCustomersToCollect) || [];
  const customersDone = useSelector(selectCustomersDone) || [];
  const defaultCustomers: CustomerMenu = {
    all: allCustomers,
    toMeter: toMeterCustomers,
    toCollect: toCollectCustomers,
    done: customersDone,
  }

  //customer states
  const [customers, setCustomers] = useState<CustomerMenu>(defaultCustomers);
  const allCustomersTrie: TrieTree<CustomerRecord> = new TrieTree('name');
  allCustomersTrie.addAll(allCustomers);

  //default customer sets
  const toMeterCustomersSet: Set<string> = new Set<string>(toMeterCustomers.map((customer: CustomerRecord) => customer.id));
  const toCollectCustomersSet: Set<string> = new Set<string>(toCollectCustomers.map((customer: CustomerRecord) => customer.id));

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
      const searchedCustomersArray = allCustomersTrie.get(searchValue);
      const searchedCustomers = new Set<string>(searchedCustomersArray.map((customer: CustomerRecord) => customer.id));

      const newCustomers: CustomerMenu = {
        all: searchedCustomersArray,
        toMeter: customers.toMeter.filter((customer: CustomerRecord) => searchedCustomers.has(customer.id)),
        toCollect: customers.toCollect.filter((customer: CustomerRecord) => searchedCustomers.has(customer.id)),
        done: customers.done.filter((customer: CustomerRecord) => searchedCustomers.has(customer.id)),
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

  const getCustomerStatus = (customer: CustomerRecord) => {
    if (toMeterCustomersSet.has(customer.id)) {
      return CustomerStatus.METER;
    } else if (toCollectCustomersSet.has(customer.id)) {
      return CustomerStatus.PAYMENT;
    }
    return undefined;
  }

  const getTabContent = () => {
      let shownCustomers;
      if (value === '0') {
        shownCustomers = customers.all;
      } else if (value === '1') {
        shownCustomers = customers.toMeter;
      } else if (value === '2') {
        shownCustomers = customers.toCollect;
      } else {
        shownCustomers = customers.done;
      }

      return (
        <div className={classes.tabContent}>
          {shownCustomers.map((customer: CustomerRecord, index) => (
              <div key={index}>
                <CustomerCard
                  name={customer.name}
                  customerId={customer.id}
                  match={match}
                  meterNumber={customer.meterNumber}
                  amount={customer.outstandingBalance}
                  active={customer.isactive}
                  status={getCustomerStatus(customer)}
                />
              </div>
            ))}
        </div>
      );
    };

  const getMeterTabLabel = () => (
    <div>
      <FlashOnIcon fontSize='inherit' className={classes.tabIcon} />
      <Typography className={classes.tabLabel}>Meter</Typography>
    </div>
  );

  const getPaymentTabLabel = () => (
    <div>
      <AttachMoneyIcon fontSize='inherit' className={classes.tabIcon} />
      <Typography className={classes.tabLabel}>Payment</Typography>
    </div>
  );

  return (
    <BaseScreen rightIcon="user" title="Customers" searchAction={handleSearchChange} searchExit={exitSearch}>
      <TabContext value={value}>
        <Tabs textColor="primary" indicatorColor="primary" value={value} onChange={changeTab}>
          <Tab className={classes.tab} label="All" value="0" />
          <Tab className={classes.tab} label={getMeterTabLabel()} value="1" />
          <Tab className={classes.tab} label={getPaymentTabLabel()} value="2" />
          <Tab className={classes.tab} label="Done" value="3" />
        </Tabs>
        <div className={classes.activeContainer}>
          <div className={classes.active}></div>
          <Typography>Status: Active</Typography>
        </div>
        <BaseScrollView>
          {getTabContent()}
        </BaseScrollView>
      </TabContext>
      <Link to={'/customers/create'}>
        <Fab color='primary' aria-label='add customer' className={classes.fab} size='medium'>
          <AddIcon fontSize="large" />
        </Fab>
      </Link>
    </BaseScreen>
  );
}

export default React.memo(CustomerMain);
