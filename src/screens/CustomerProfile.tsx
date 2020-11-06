import React from 'react';
import Typography from '@material-ui/core/Typography';
import BaseHeader from '../components/BaseComponents/BaseHeader';
import OutlinedColCard from '../components/OutlinedCardList';
import Button from '@material-ui/core/Button';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import { CustomerRecord } from '../utils/airtable/interface';

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

interface CustomerProps {
  customer: CustomerRecord;
  classes: any;
}

function CustomerProfile(props: CustomerProps) {
  const { classes } = props;

  const getPaymentButtons = () => {
    return (
      <>
        <Button className={classes.button} color="primary" startIcon={<AddIcon />} disableElevation={true}>
          Add Payment
        </Button>
        <div className={classes.buttonSecondary}>
          <IconButton size="small">
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
  const numbers = [0, 0, 0];
  const labels = ['Fixed Tariff', 'Unit Tariff', 'Minimum Units Used'];
  const numbers2 = [0, 0, 0];
  const labels2 = ['Starting Meter', 'Period Usage', 'Amount Billed'];
  const unit = ['kWh', 'kWh', 'Ks'];
  // const primary = [true, false, false, false];

  const s = ['Remaining Balance'];

  return (
    <div className={classes.root}>
      <BaseHeader leftIcon="backNav" title={props.customer.name} rightIcon="edit" />
      <div className={classes.content}>
        <Typography variant="h1">Site Name</Typography>
        <Typography variant="h4" color="textSecondary">
          {props.customer.meterNumber}
        </Typography>

        <Typography className={classes.header} variant="h2">
          Payment
        </Typography>
        <OutlinedColCard numbers={[0]} labels={s} unit={['Ks']} primary={true} rightIcon={getPaymentButtons()} />

        <Typography className={classes.header} variant="h2">
          Meter Reading
        </Typography>
        <OutlinedColCard numbers={[0]} labels={['Current Reading']} unit={['kWh']} primary={true} rightIcon={getAddButton()} />
        <OutlinedColCard numbers={numbers2} labels={labels2} unit={unit} primary={false} />
      </div>
    </div>
  );
}

export default withStyles(styles)(CustomerProfile);
