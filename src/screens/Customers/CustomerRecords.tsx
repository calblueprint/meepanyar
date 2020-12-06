import React from 'react';
import { Typography } from '@material-ui/core';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import TabMenu from '../../components/CustomerRecords/TabMenu';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';
import { PaymentRecord, MeterReadingRecord } from '../../utils/airtable/interface';
import { connect } from 'react-redux';
import { RootState } from '../../lib/redux/store';

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
  });

interface CustomerRecordsProps extends RouteComponentProps {
  classes: { root: string; content: string };
  location: any;
}

function CustomerRecords(props: CustomerRecordsProps) {
  const { classes } = props;
  const payments: PaymentRecord[] = props.location.state.payments;
  const meterReadings: MeterReadingRecord[] = props.location.state.meterReadings;

  return (
    <div className={classes.root}>
      <BaseHeader leftIcon="backNav" />
      <div className={classes.content}>
        <Typography variant="h1">Records</Typography>
        <TabMenu meterReadings={meterReadings} payments={payments} />
      </div>
    </div>
  );
}

export default withStyles(styles)(CustomerRecords);
