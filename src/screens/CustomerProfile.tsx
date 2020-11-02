import Typography from '@material-ui/core/Typography';
import React from 'react';
import BaseHeader from '../components/BaseComponents/BaseHeader';
import OutlinedRowCard from '../components/OutlinedRowCard';
import OutlinedColCard from '../components/OutlinedColCard';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import PaymentCard from '../components/PaymentCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    content: {
      margin: '0 25px',
      textAlign: 'left',
      color: theme.palette.text.primary,
    },
    confirmButton: {
      borderRadius: '15px',
      borderColor: theme.palette.grey[400],
      marginTop: '-10px',
      float: 'right',
    },
  }),
);

export default function CustomerProfile() {
  const classes = useStyles();

  //dummy data
  //TODO: pull from Airtable and hold information in the form of Records as defined in the schema
  const numbers = [0, 0, 0];
  const labels = ['Fixed Tariff', 'Unit Tariff', 'Minimum Units Used'];
  const numbers2 = [0, 0, 0, 0];
  const labels2 = ['Current Reading', 'Starting Meter', 'Period Usage', 'Amount Billed'];
  const unit = ['kWh', 'kWh', 'kWh', 'Ks'];
  const primary = [true, false, false, false];

  return (
    <div className={classes.root}>
      <BaseHeader leftIcon="backNav" title="Customer Profile" rightIcon="edit" />
      <div className={classes.content}>
        <Typography variant="h1">Site Name</Typography>
        <Typography variant="h4" color="textSecondary">
          Meter Number
        </Typography>
        <OutlinedRowCard numbers={numbers} labels={labels} />

        <Typography variant="h2">Meter Reading</Typography>
        <OutlinedColCard numbers={numbers2} labels={labels2} unit={unit} primary={primary} />
        <Button
          className={classes.confirmButton}
          color="primary"
          variant="outlined"
          size="small"
          startIcon={<CheckIcon />}
        >
          <Typography variant="h4">Confirm</Typography>
        </Button>

        {/* <PaymentCard balance={0} owed={0} /> */}
      </div>
    </div>
  );
}
