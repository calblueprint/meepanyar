import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState, store } from '../../lib/redux/store';
import { formatUTCDateStringToLocal } from '../../lib/moment/momentUtils';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import { CustomerRecord, SiteRecord } from '../../lib/airtable/interface';
import HomeMenuItem from './components/HomeMenuItem';
import SiteMenu from './components/SiteMenu';

import Typography from '@material-ui/core/Typography';
import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { getAllSites } from '../../lib/airtable/request';

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
  useEffect(() => {
    proccessData();
  }, []);

  const [numOutstandingPayments, setNumOutstandingPayments] = useState<number>();
  const [numCustomersToCharge, setNumToCharges] = useState<number>();
  const [customerDetails, setCustomerDetails] = useState<number>();
  const [unpaidReports, setUnpaidReports] = useState<number>();



  const proccessData = () => {
    calculateCustomerData(currentSite);
    calculateUnpaidReports(currentSite)
  }

  const calculateCustomerData = (site: SiteRecord) => {
    // customers to charge:  haven't charged yet/ no meterreading
    // outstanding payments: done the meter reading / charged, haven't paid yet
    let toCharge = 0;
    let outstandingPayments = 0;
    //get day
    const today = new Date();
    const currMonth = today.getUTCMonth();
    let customers = site.customers;
    for (let i = 0; i < customers.length; i++) {
      const currCustomer = customers[i]
      //depends if the meter readings list is sorted with earliest => latest
      let latestMeterReading = currCustomer.meterReadings[currCustomer.meterReadings.length - 1];
      if (latestMeterReading != null) {
        const dateTime = Date.parse(latestMeterReading.date);
        let readingDate = new Date(dateTime);
        if (readingDate.getUTCMonth() < currMonth) {
          toCharge += 1;
        }
        if (checkPayment(currCustomer)) {
          outstandingPayments += 1;
        }
      }
    }
    setNumOutstandingPayments(outstandingPayments);
    setNumToCharges(toCharge);
    console.log(outstandingPayments);
    console.log(toCharge + outstandingPayments);
    setCustomerDetails(toCharge + outstandingPayments);
  }

  //true has outstadining false has paid
  const checkPayment = (customer: CustomerRecord) => {
    return parseInt(customer.outstandingBalance) > 0;
  }

  const calculateUnpaidReports = (site: SiteRecord) => {
    let unpaid = 0;
    let summaries = site.financialSummaries;
    for (let i = 0; i < summaries.length; i++) {
      let singleSummary = summaries[i];
      if (singleSummary.totalCustomersBilled > singleSummary.totalCustomersPaid) {
        unpaid += 1;
      }
    }
    console.log('unpaid')
    console.log(unpaid)
    setUnpaidReports(unpaid);
  }

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
          amount={customerDetails ? customerDetails : 0}
          sublabels={[
            { amount: 2, label: 'Customers to Charge' },
            { amount: 2, label: 'Outstanding Payments' },
          ]}
        />
      </Link>
      <Link to={'/financial-summary'}>
        <HomeMenuItem label="Unpaid Reports" amount={unpaidReports} />
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
