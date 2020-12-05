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

class CustomerProfile extends React.Component<CustomerProps, {}> {
  render() {
    const { classes, match } = this.props;
    const customer = this.props.location.state.customer;
    const meterReadings = customer.meterReadings;

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

    const getAmountBilled = (customer: CustomerRecord, currReading: number, startingMeter = 0) => {
      const tariffPlan = customer.tariffPlans[0];
      const periodUsage = currReading - startingMeter;
      return tariffPlan.fixedTariff + tariffPlan.tariffByUnit * periodUsage;
    };

    // data retrieval
    const currReading: MeterReadingRecord | undefined = getCurrentReading(customer);
    const startingMeter: MeterReadingRecord | undefined = getStartingMeter(customer);
    const currReadingAmount = currReading? currReading.amountBilled : 0;
    const startingMeterAmount = startingMeter? startingMeter.amountBilled : 0;

    const meterInfo = [
      { number: startingMeterAmount, label: 'Starting Meter', unit: 'kWh' },
      { number: currReadingAmount - startingMeterAmount, label: 'Period Usage', unit: 'kWh' },
      { number: customer.totalAmountBilledfromInvoices, label: 'Amount Billed', unit: 'kS' },
    ];
    const balanceInfo = [{ number: customer.outstandingBalance, label: 'Remaining Balance', unit: 'kS' }];
    const readingInfo = [{ number: currReadingAmount, label: 'Current Reading', unit: 'kWh' }];

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
          <Typography variant="h1">{this.props.siteName}</Typography>
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
}

const mapStateToProps = (state: RootState) => {
  let customers = state.siteData.currentSite.customers;
  let siteName = state.siteData.currentSite.name;
  return { customers, siteName };
};

export default connect(mapStateToProps)(withStyles(styles)(CustomerProfile));
