import React from 'react';
import Typography from '@material-ui/core/Typography';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import OutlinedColCard from '../../components/OutlinedCardList';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link, RouteComponentProps } from 'react-router-dom';
import { CustomerRecord } from '../../utils/airtable/interface';

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
  classes: { root: string; content: string; header: string; button: string; buttonSecondary: string };
  location: any;
}

function CustomerProfile(props: CustomerProps) {
  const { classes, match } = props;
  const customer: CustomerRecord = props.location.state.customer;

  const getPaymentButtons = () => {
    return (
      <>
        <Button className={classes.button} color="primary" startIcon={<AddIcon />} disableElevation={true}>
          Add Payment
        </Button>
        <div className={classes.buttonSecondary}>
          <IconButton
            component={Link}
            to={{
              pathname: `${match.url}/records`,
              state: { meterReadings: customer.meterReadings, invoices: customer.invoices },
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
        <IconButton size="small">
          <AddIcon style={{ color: 'white' }} />
        </IconButton>
      </div>
    );
  };

  //dummy data
  //TODO: pull from Airtable and hold information in the form of Records as defined in the schema
  const info3 = [
    { number: 0, label: 'Fixed Tariff', unit: 'kWh' },
    { number: 0, label: 'Period Usage', unit: 'kWh' },
    { number: 0, label: 'Amount Billed', unit: 'kS' },
  ];

  const balanceInfo = [{ number: 0, label: 'Remaining Balance', unit: 'kS' }];
  const readingInfo = [{ number: 0, label: 'Current Reading', unit: 'kWh' }];

  return (
    <div className={classes.root}>
      <BaseHeader leftIcon="backNav" title={customer.name} rightIcon="edit" />
      <div className={classes.content}>
        <Typography variant="h1">Site Name</Typography>
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
        <OutlinedColCard info={info3} primary={false} />
      </div>
    </div>
  );
}

export default withStyles(styles)(CustomerProfile);