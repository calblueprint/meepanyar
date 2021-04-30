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
  const intl = useInternationalization();
  const classes = styles(props);
  const { match } = props;
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
      <Typography className={classes.tabLabel}>{intl(words.meter)}</Typography>
    </div>
  );

  const getPaymentTabLabel = () => (
    <div>
      <AttachMoneyIcon className={classes.tabIcon} />
      <Typography className={classes.tabLabel}>{intl(words.payment)}</Typography>
    </div>
  );

  return (
    <BaseScreen rightIcon="user" title={intl(words.customers)} searchAction={handleSearchChange} searchExit={exitSearch}>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={tabValue}
        onChange={changeTab}
        variant="scrollable"
      >
        <Tab className={classes.tab} label={intl(words.all)} value={CustomerStatus.ALL} />
        <Tab className={classes.tab} label={getMeterTabLabel()} value={CustomerStatus.METER} />
        <Tab className={classes.tab} label={getPaymentTabLabel()} value={CustomerStatus.PAYMENT} />
        <Tab className={classes.tab} label={intl(words.done)} value={CustomerStatus.DONE} />
      </Tabs>
      <div className={classes.indicatorContainer}>
        <FiberManualRecordIcon className={classes.indicator}/>
        <Typography>{`${intl(words.status)}: ${intl(words.active)}`}</Typography>
      </div>
      <BaseScrollView>
        {getTabContent()}
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
