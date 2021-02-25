import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { formatUTCDateStringToLocal } from '../../lib/moment/momentUtils';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { SiteRecord } from '../../lib/airtable/interface';
import HomeMenuItem from './components/HomeMenuItem';
import SiteMenu from './components/SiteMenu';

import Typography from '@material-ui/core/Typography';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { createCustomer } from '../../lib/airtable/request';
import { openDB } from 'idb';

const styles = () =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '35px',
    },
    network: {
      color: '#BDBDBD',
      textAlign: 'right',
      width: '100px',
    },
  });

interface HomeProps {
  classes: { header: string; network: string };
  lastUpdated: string;
  isOnline: boolean;
  currentSite: SiteRecord;
}

function Home(props: HomeProps) {
  const { classes, lastUpdated, isOnline, currentSite } = props;

  const onChangeCreateCustomer = () => {
    const fakeCustomerPayload = {
      fakeCustomer: "hello"
    }
    createCustomer(fakeCustomerPayload)
  }

  const logQueuedRequests = async () => {
    const db = await openDB('workbox-background-sync');
    const getTransaction = db.transaction('requests');
    const objectStore = getTransaction.objectStore('requests');
    let requestCursor = await objectStore.openCursor();
    while (requestCursor) {
      try {
        const requestValue = requestCursor.value;
        const requestKey = requestCursor.key;
        console.log(requestKey, requestValue);

      } catch (error) {
        console.log('Error when iterating through cursor on key ', requestCursor.key);
      }
      requestCursor = await requestCursor.continue();
    }
  }

  return (
    <BaseScreen rightIcon="user">
      <div className={classes.header}>
        <button onClick={onChangeCreateCustomer}>
          Create Customer Button
        </button>
        <button onClick={logQueuedRequests}>
          Log queued requests to console
        </button>
        <SiteMenu currentSite={currentSite} />
        <div className={classes.network}>
          {isOnline ? <WifiIcon color="primary" /> : <WifiOffIcon color="secondary" />}
          <Typography className={classes.network} variant="body1">
            Last Connected to Network <br />
            {lastUpdated}
          </Typography>
        </div>
      </div>

      <Link to={'/customers'}>
        <HomeMenuItem
          label="Customer Alerts"
          amount={1}
          sublabels={[
            { amount: 1, label: 'Customers to Charge' },
            { amount: 2, label: 'Outstanding Payments' },
          ]}
        />
      </Link>
      <Link to={'/financial-summary'}>
        <HomeMenuItem label="Unpaid Reports" amount={1} />
      </Link>
      <HomeMenuItem label="Unresolved Incidents" amount={0} />
      <Link to={'/financial-summary'}>
        <HomeMenuItem label="Financial Summary" noBadge={true} />
      </Link>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => {
  let lastUpdated = '';

  if (state.userData.lastUpdated) {
    lastUpdated = formatUTCDateStringToLocal(state.userData.lastUpdated);
  }
  const isOnline = state.userData.isOnline;
  const currentSite = state.siteData.currentSite;

  return { lastUpdated, isOnline, currentSite };
};

export default connect(mapStateToProps)(withStyles(styles)(Home));
