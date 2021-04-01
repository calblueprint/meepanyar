import React from 'react';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import { formatUTCDateStringToLocal } from '../../lib/moment/momentUtils';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { isBeforeCurrentPeriod } from '../../lib/moment/momentUtils';

import { SiteRecord } from '../../lib/airtable/interface';
import HomeMenuItem from './components/HomeMenuItem';
import SiteMenu from './components/SiteMenu';

import Typography from '@material-ui/core/Typography';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { CustomerRecord } from '../../lib/airtable/interface';
import { selectAllCustomersArray } from '../../lib/redux/customerDataSlice';

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
  const customers : CustomerRecord[] = useSelector(selectAllCustomersArray) || [];

  const calculateCustomerData = () => {
    // customers to charge:  haven't charged yet / no meter reading
    // outstanding payments: done the meter reading / charged, haven't paid yet
    let numCustomersToCharge = 0;
    let numOutstandingPayments = 0;
    for (let i = 0; i < customers.length; i++) {
      const currCustomer = customers[i]
      //depends if the meter readings list is sorted with earliest => latest
      const latestMeterReading = currCustomer.meterReadings[currCustomer.meterReadings.length - 1];
      if (latestMeterReading != null) {
        if (isBeforeCurrentPeriod(latestMeterReading.date)) {
          numCustomersToCharge += 1;
        }
        if (parseInt(currCustomer.outstandingBalance) > 0) {
          numOutstandingPayments += 1;
        }
      } else {
        numCustomersToCharge += 1;
      }
    }
    return { numOutstandingPayments, numCustomersToCharge }
  }


  const customerData = calculateCustomerData();
  return (
    <BaseScreen rightIcon="user">
      <div className={classes.header}>
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
          amount={customerData.numCustomersToCharge + customerData.numOutstandingPayments}
          sublabels={[
            { amount: customerData.numCustomersToCharge, label: 'Customers to Charge' },
            { amount: customerData.numOutstandingPayments, label: 'Outstanding Payments' },
          ]}
        />
      </Link>
      <Link to={'/financial-summary'}>
        <HomeMenuItem label="Unpaid Reports" amount={0} />
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
