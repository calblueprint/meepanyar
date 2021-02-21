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
  classes: { content: string; header: string; button: string; buttonSecondary: string };
  location: any;
}

function CustomerProfile(props: CustomerProps) {
  const { classes, match } = props;
  const customer: CustomerRecord = props.location.state.customer;

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
              state: { invoices: customer.meterReadings, payments: customer.payments },
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
          <Typography variant="h4" color="textSecondary">
            {customer.meterNumber}
          </Typography>

          <OutlinedCardList info={tariffInfo} primary={false} columns/>

          <Typography className={classes.header} variant="h2">
            Payment
          </Typography>
          <OutlinedCardList info={balanceInfo} primary={true} rightIcon={getPaymentButtons()} />

          <Typography className={classes.header} variant="h2">
            Meter Reading
          </Typography>
          <OutlinedCardList info={readingInfo} primary={true} rightIcon={getAddButton()} />
          <OutlinedCardList info={info3} primary={false} />
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

export default withStyles(styles)(CustomerProfile);
