import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import OutlinedCardList from '../../components/OutlinedCardList';
import { CustomerRecord } from '../../lib/airtable/interface';
import { store } from '../../lib/redux/store';


const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    section: {
      marginTop: '30px',
    },
    headerWrapper: {
      marginTop: '15px',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buttonPrimary: {
      borderRadius: '12px',
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },
    buttonSecondary: {
      borderRadius: '12px',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
  });

interface CustomerProps extends RouteComponentProps {
  classes: { content: string; section: string; headerWrapper: string; buttonPrimary: string; buttonSecondary: string;};
  location: any;
}

function CustomerProfile(props: CustomerProps) {
  const { classes, match } = props;
  const customer: CustomerRecord = props.location.state.customer;

  const getPaymentButton = () => {
    return (
        <Button
          variant="contained"
          className={classes.buttonPrimary}
          startIcon={<AddIcon />}
          disableElevation={true}
        >
          Add Payment
        </Button>
    );
  };

  const getRecordsButton = () => {
    return (
      <Button
        variant="contained"
        component={Link}
        to={{
          pathname: `${match.url}/records`,
          state: { invoices: customer.meterReadings, payments: customer.payments },
        }}
        className={classes.buttonSecondary}
        startIcon={<ListAltOutlinedIcon />}
        disableElevation={true}
      >
        Records
      </Button>
    );
  };

  const getAddButton = () => {
    return (
      <div className={classes.buttonPrimary}>
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

  const getFixedTariff= () => {
    return customer.tariffPlans.fixedTariff;
  }

  const getUnitTariff= () => {
    return customer.tariffPlans.tariffByUnit;
  }

  const getMinUnits= () => {
    return customer.tariffPlans.minUnits;
  }


  //dummy data
  //TODO: pull from Airtable and hold information in the form of Records as defined in the schema
  const info3 = [
    { number: 0 , label: 'Starting Meter', unit: 'kWh' },
    { number: 0, label: 'Period Usage', unit: 'kWh' },
    { number: 0, label: 'Amount Billed', unit: 'kS' },
  ];

  const getSiteName = () => {
    const siteData = store.getState().siteData.currentSite;
    return siteData.name;
  }

  const tariffInfo = [
    { number: getFixedTariff() , label: 'Fixed Tariff', unit: 'MMK' },
    { number: getUnitTariff(), label: 'Unit Tariff', unit: 'MMK' },
    { number: getMinUnits(), label: 'Minimum Units Used', unit: '' },
  ]

  const balanceInfo = [{ number: parseFloat(customer.outstandingBalance), label: 'Remaining Balance', unit: 'kS' }];
  const readingInfo = [{ number: 0, label: 'Current Reading', unit: 'kWh' }];

  return (
    <BaseScreen leftIcon="backNav" title={customer.name} rightIcon="edit" match={match}>
      <BaseScrollView>
        <div className={classes.content}>
          <Typography variant="h1">{getSiteName()}</Typography>
          <Typography variant="body1" color="textSecondary">
            {customer.meterNumber}
          </Typography>
          <OutlinedCardList info={tariffInfo} primary={false} columns/>
          <div className={classes.section}>
            <div className={classes.headerWrapper}>
              <Typography variant="h2">Payment</Typography>
              {getRecordsButton()}
            </div>
            <OutlinedCardList info={balanceInfo} primary={true} rightIcon={getPaymentButton()} />
          </div>
          <div className={classes.section}>
            <Typography variant="h2">
              Meter Reading
            </Typography>
            <OutlinedCardList info={readingInfo} primary={true} rightIcon={getAddButton()} />
            <OutlinedCardList info={info3} primary={false} />
          </div>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(CustomerProfile);
