import React from 'react';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import OutlinedColCard from '../../components/OutlinedCardList';
import { Button, IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link, RouteComponentProps } from 'react-router-dom';
import { CustomerRecord, MeterReadingRecord } from '../../utils/airtable/interface';
import { connect } from 'react-redux';
import { RootState } from '../../lib/redux/store';
import moment from 'moment';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    content: {
      margin: '0 25px',
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
    header: {
      marginTop: '15px',
    },
    button: {
      borderRadius: '12px',
      height: '30px',
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },
    buttonSecondary: {
      borderRadius: '12px',
      backgroundColor: theme.palette.secondary.main,
    },
  });

interface CustomerProps extends RouteComponentProps {
  match: { params: string; isExact: boolean; path: string; url: string; }
  classes: { root: string; content: string; header: string; button: string; buttonSecondary: string };
  siteName: string;
  location: any;
}

function CustomerProfile(props: CustomerProps) {
  const { classes, match } = props;
  const customer = props.location.state.customer;

  // helper functions for getting data
  const isCurrentReading = (mr: MeterReadingRecord): boolean => {
    const period: number = parseInt(mr.date.slice(5, 7));
    const currPer: number = moment().month() + 1;
    return period == currPer;
  };

  const getCurrentReading = (customer: CustomerRecord): MeterReadingRecord | undefined => {
    return customer.meterReadings.find(function (mr: MeterReadingRecord) {
      return isCurrentReading(mr);
    });
  };

  const isStartingMeter = (mr: MeterReadingRecord): boolean => {
    const period: number = parseInt(mr.date.slice(5, 7)) % 12;
    const lastPer: number = moment().month();
    return period == lastPer;
  };

  const getStartingMeter = (customer: CustomerRecord): MeterReadingRecord | undefined => {
    return customer.meterReadings.find(function (mr: MeterReadingRecord) {
      return isStartingMeter(mr);
    });
  };

  const getPeriodAndBilled = (customer: CustomerRecord, currReading: MeterReadingRecord, startingMeter: MeterReadingRecord | undefined) => {
    const tariffPlan = customer.tariffPlans[0];
    const periodUsage = currReading.amountBilled - (startingMeter? startingMeter.amountBilled : 0);
    const amountBilled = tariffPlan.fixedTariff + tariffPlan.tariffByUnit * periodUsage;
    return { periodUsage: periodUsage, amountBilled: amountBilled };
  };

  // data retrieval
  const undefinedAmount = '-';
  const currReading: MeterReadingRecord | undefined = getCurrentReading(customer);
  const startingMeter: MeterReadingRecord | undefined = getStartingMeter(customer);
  const { periodUsage, amountBilled } = currReading ? getPeriodAndBilled(customer, currReading, startingMeter) : { periodUsage: '-', amountBilled: '-' };

  const meterInfo = [
    { number: startingMeter? startingMeter.amountBilled.toString() : undefinedAmount, label: 'Starting Meter', unit: 'kWh' },
    { number: periodUsage.toString(), label: 'Period Usage', unit: 'kWh' },
    { number: amountBilled.toString(), label: 'Amount Billed', unit: 'kS' },
  ];
  const balanceInfo = [{ number: customer.outstandingBalance.toString(), label: 'Remaining Balance', unit: 'kS' }];
  const readingInfo = [{ number: currReading? currReading.amountBilled.toString() : undefinedAmount, label: 'Current Reading', unit: 'kWh' }];

  // button components
  const getPaymentButtons = () => {
    return (
      <>
        <Button
          variant="contained"
          className={classes.button}
          color="primary"
          startIcon={<AddIcon />}
          disableElevation={true}
        >
          Add Payment
        </Button>
        <div className={classes.buttonSecondary}>
          <IconButton
            component={Link}
            to={{
              pathname: `${match.url}/records`,
              state: { meterReadings: customer.meterReadings, payments: customer.payments },
            }}
            size="small"
          >
            <ListAltOutlinedIcon color="primary" />
          </IconButton>
        </div>
      </>
    );
  };

  const getAddButton = () => {
    return (
      <div className={classes.button}>
        <IconButton
          component={Link}
          to={{
            pathname: `${match.url}/addMeter`,
            state: { invoices: customer.meterReadings, payments: customer.payments },
          }}
          size="small"
        >
          <AddIcon style={{ color: 'white' }} />
        </IconButton>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <BaseHeader leftIcon="backNav" title={customer.name} rightIcon="edit" match={match} />
      <div className={classes.content}>
        <Typography variant="h1">{props.siteName}</Typography>
        <Typography variant="h4" color="textSecondary">
          {customer.meterNumber}
        </Typography>

        <Typography className={classes.header} variant="h2">
          Payment
        </Typography>
        <OutlinedColCard info={balanceInfo} primary={true} rightIcon={getPaymentButtons()} />

        <Typography className={classes.header} variant="h2">
          Meter Reading
        </Typography>
        <OutlinedColCard info={readingInfo} primary={true} rightIcon={getAddButton()} />
        <OutlinedColCard info={meterInfo} primary={false} />
      </div>
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  let customers = state.siteData.currentSite.customers;
  let siteName = state.siteData.currentSite.name;
  return { customers, siteName };
};

export default connect(mapStateToProps)(withStyles(styles)(CustomerProfile));
