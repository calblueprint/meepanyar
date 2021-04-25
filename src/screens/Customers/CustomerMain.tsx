import { Typography, createStyles, Fab, Theme, makeStyles, Tabs, Tab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { CustomerRecord } from '../../lib/airtable/interface';
import { selectAllCustomersArray } from '../../lib/redux/customerDataSlice';
import TrieTree from '../../lib/utils/TrieTree';
import { selectCustomersToMeter, selectCustomersToCollect, selectCustomersDone, CustomerStatus } from '../../lib/redux/customerData';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import CustomerCard from './components/CustomerCard';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';


const styles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(1),
      right: theme.spacing(2),
      color: 'white',
    },
<<<<<<< HEAD
  });

interface CustomerMainProps extends RouteComponentProps {
  classes: { title: string; headerWrapper: string; selectionHeader: string; rightAlign: string; fab: string; };
  customers: CustomerRecord[]
}

enum SortBy {
  NAME = words.name_a__z as any,
  METER = words.meter_number as any
}

enum FilterBy {
  PAYMENT_STATUS = words.payment_status as any,
  METER_STATUS = words.meter_status as any,
  ACTIVE_STATUS = words.active_status as any,
}

type FilterByLabel = Record<keyof typeof FilterBy, string[]>;

const labels: FilterByLabel = {
  'PAYMENT_STATUS': [words.unpaid, words.paid],
  'METER_STATUS': [words.has_meter, words.no_meter],
  'ACTIVE_STATUS': [words.active_user, words.inactive_user]
}

function CustomerMain(props: CustomerMainProps) {
  const intl = useInternationalization(); 
  const { classes } = props;
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerRecord[]>([]);
  const [filteredCustomersAlt, setFilteredCustomersAlt] = useState<CustomerRecord[]>([]);
  const [allCustomersTrie, setAllCustomersTrie] = useState<TrieTree<CustomerRecord>>(new TrieTree('name'));
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.NAME);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.ACTIVE_STATUS);
  const [sortAndFilter, setSortAndFilter] = useState<string[]>([])
  const [filterLabels, setFilterLabels] = useState<string[]>(labels["ACTIVE_STATUS"]);
=======
    tab: {
      fontSize: '12px',
      '&:focus': {
        outline: 'none',
      },
    },
    indicator: {
      fontSize: '10px',
      color: theme.palette.success.main,
      marginRight: '5px',
    },
    indicatorContainer: {
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
>>>>>>> 9b737503b3ce761b28ffe1b31029526be41ce1a2
  const [searchValue, setSearchValue] = useState<string>("");
  const [tabValue, setTabValue] = useState<CustomerStatus>(CustomerStatus.ALL);
  const changeTab = (event: React.ChangeEvent<{}>, newValue: CustomerStatus) => {
    setTabValue(newValue);
  };

  // Default customer arrays
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

  // Customer states
  const [customers, setCustomers] = useState<CustomerMenu>(defaultCustomers);
  const allCustomerNamesTrie: TrieTree<CustomerRecord> = new TrieTree('name');
  const allCustomerNumbersTrie: TrieTree<CustomerRecord> = new TrieTree('customerNumber');
  allCustomerNamesTrie.addAll(allCustomers);
  allCustomerNumbersTrie.addAll(allCustomers);

  // Default customer sets
  const toMeterCustomersSet: Set<string> = new Set<string>(toMeterCustomers.map((customer: CustomerRecord) => customer.id));
  const toCollectCustomersSet: Set<string> = new Set<string>(toCollectCustomers.map((customer: CustomerRecord) => customer.id));

  // Updates after every character typed
  useEffect(() => {
    getCustomers();
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchVal = e.target.value.trim();
    setSearchValue(searchVal);
  }

  const getCustomers = () => {
    if (searchValue !== '') {
      let searchedCustomersArray;

      // Checks whether first character is number or letter
      if (isNaN(parseInt(searchValue[0]))) {
        searchedCustomersArray = allCustomerNamesTrie.get(searchValue);
      } else {
        searchedCustomersArray = allCustomerNumbersTrie.get(searchValue);
      }

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
      // TODO: useMemo could speed up tabbing
      // https://github.com/calblueprint/meepanyar/pull/85#discussion_r614478966
      let shownCustomers;

      switch (tabValue) {
        case CustomerStatus.METER:
          shownCustomers = customers.toMeter;
          break;
        case CustomerStatus.PAYMENT:
          shownCustomers = customers.toCollect;
          break;
        case CustomerStatus.DONE:
          shownCustomers = customers.done;
          break;
        default:
          shownCustomers = customers.all;
          break;
      }

      return (
        <div className={classes.tabContent}>
          {shownCustomers.map((customer: CustomerRecord, index) => (
              <div key={index}>
                <CustomerCard
                  customer={customer}
                  match={match}
                  status={getCustomerStatus(customer)}
                />
              </div>
            ))}
        </div>
      );
    };

  const getMeterTabLabel = () => (
    <div>
      <FlashOnIcon className={classes.tabIcon} />
      <Typography className={classes.tabLabel}>Meter</Typography>
    </div>
  );

  const getPaymentTabLabel = () => (
    <div>
      <AttachMoneyIcon className={classes.tabIcon} />
      <Typography className={classes.tabLabel}>Payment</Typography>
    </div>
  );

  return (
<<<<<<< HEAD
    <BaseScreen rightIcon="user">
      <div className={classes.headerWrapper}>
        <h1 className={classes.title}>{intl(words.customers)}</h1>
      </div>
      <div className={classes.selectionHeader}>
        <SearchBar placeholder="Search for a customer" onSearchChange={handleSearchChange} />
        <FormControl>
          <Select onChange={handleMenuSelect} multiple value={sortAndFilter} inputProps={{ 'aria-label': 'Without label' }}>
            <ListSubheader>{intl(words.sort_by)}</ListSubheader>
            <MenuItem value="NAME">{intl(words.name_a__z)}</MenuItem>
            <MenuItem value="METER">{intl(words.meter_number)}</MenuItem>
            <ListSubheader>{intl(words.filter_by)}</ListSubheader>
            <MenuItem value="PAYMENT_STATUS">{intl(words.payment_status)}</MenuItem>
            <MenuItem value="METER_STATUS">{intl(words.meter_status)}</MenuItem>
            <MenuItem value="ACTIVE_STATUS">{intl(words.active_status)}</MenuItem>
          </Select>
          <div className={classes.rightAlign}><FormHelperText>{intl(words.sort_and_filter)}</FormHelperText></div>
        </FormControl>
      </div>
      <BaseScrollView>
        <FormHelperText>{intl(filterLabels[0])}</FormHelperText>
        {filteredCustomers.map((customer, index) => (
          <Link key={index} to={`${props.match.url}/customer`} onClick={() => setCurrentCustomerIdInRedux(customer.id)} >
            <CustomerCard name={customer.name} amount={customer.outstandingBalance.toString()} date={getLatestReadingDate(customer)} active={customer.isactive} />
          </Link>
        ))
        }
        <FormHelperText>{intl(filterLabels[1])}</FormHelperText>
        {filteredCustomersAlt.map((customer, index) => (
          <Link key={index} to={`${props.match.url}/customer`} onClick={() => setCurrentCustomerIdInRedux(customer.id)} >
            <CustomerCard name={customer.name} amount={customer.outstandingBalance.toString()} date={getLatestReadingDate(customer)} active={customer.isactive} />
          </Link>
        ))
        }
=======
    <BaseScreen rightIcon="user" title="Customers" searchAction={handleSearchChange} searchExit={exitSearch}>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={tabValue}
        onChange={changeTab}
        variant="scrollable"
      >
        <Tab className={classes.tab} label="All" value={CustomerStatus.ALL} />
        <Tab className={classes.tab} label={getMeterTabLabel()} value={CustomerStatus.METER} />
        <Tab className={classes.tab} label={getPaymentTabLabel()} value={CustomerStatus.PAYMENT} />
        <Tab className={classes.tab} label="Done" value={CustomerStatus.DONE} />
      </Tabs>
      <div className={classes.indicatorContainer}>
        <FiberManualRecordIcon className={classes.indicator}/>
        <Typography>Status: Active</Typography>
      </div>
      <BaseScrollView>
        {getTabContent()}
>>>>>>> 9b737503b3ce761b28ffe1b31029526be41ce1a2
      </BaseScrollView>
      <Link to={'/customers/create'}>
        <Fab color='primary' aria-label='add customer' className={classes.fab} size='medium'>
          <AddIcon fontSize="large" />
        </Fab>
      </Link>
    </BaseScreen>
  );
}

export default React.memo(CustomerMain);
