import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState, store } from '../../lib/redux/store';
import { formatUTCDateStringToLocal } from '../../lib/moment/momentUtils';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { lessThanCurrentPeriod } from '../../lib/moment/momentUtils';

import { CustomerRecord, SiteRecord } from '../../lib/airtable/interface';
import HomeMenuItem from './components/HomeMenuItem';
import SiteMenu from './components/SiteMenu';

import Typography from '@material-ui/core/Typography';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import BaseScreen from '../../components/BaseComponents/BaseScreen';

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

  const calculateCustomerData = () => {
    // customers to charge:  haven't charged yet/ no meterreading
    // outstanding payments: done the meter reading / charged, haven't paid yet
    let numCustomersToCharge = 0;
    let numOutstandingPayments = 0;
    const customers = currentSite.customers;
    for (let i = 0; i < customers.length; i++) {
      const currCustomer = customers[i]
      //depends if the meter readings list is sorted with earliest => latest
      let latestMeterReading = currCustomer.meterReadings[currCustomer.meterReadings.length - 1];
      if (latestMeterReading != null) {
        let lessMonth = lessThanCurrentPeriod(latestMeterReading.date);
        if (lessMonth) {
          numCustomersToCharge += 1;
        }
        if (parseInt(currCustomer.outstandingBalance) > 0) {
          numOutstandingPayments += 1;
        }
      } else {
        numCustomersToCharge += 1;
      }
    }
    return { 'numOutstandingPayments': numOutstandingPayments, 'numCustomersToCharge': numCustomersToCharge }
  }


  const calculateUnpaidReports = () => {
    let unpaid = 0;
    const summaries = currentSite.financialSummaries;
    for (let i = 0; i < summaries.length; i++) {
      const singleSummary = summaries[i];
      if (singleSummary.totalCustomersBilled > singleSummary.totalCustomersPaid) {
        unpaid += 1;
      }
    }
    return unpaid;
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
        <HomeMenuItem label="Unpaid Reports" amount={calculateUnpaidReports()} />
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
