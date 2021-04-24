import React from 'react';
import { Typography } from '@material-ui/core';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import RecordsTabMenu from './components/RecordsTabMenu';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';
import { PaymentRecord, MeterReadingRecord } from '../../lib/airtable/interface';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      display: 'flex',
      flexDirection: 'column',
      color: theme.palette.text.primary,
      height: '100%',
    },
  });

interface CustomerRecordsProps extends RouteComponentProps {
  classes: { content: string };
  location: any;
}

function CustomerRecords(props: CustomerRecordsProps) {
  const { classes } = props;
  const payments: PaymentRecord[] = props.location.state.payments;
  const invoices: MeterReadingRecord[] = props.location.state.invoices;
  const defaultTab: string = props.location.state.defaultTab;

  return (
    <BaseScreen leftIcon="backNav">
      <div className={classes.content}>
        <Typography variant="h1">Records</Typography>
        <RecordsTabMenu invoices={invoices} payments={payments} defaultTab={defaultTab} />
      </div>
    </BaseScreen>
  );
}

export default withStyles(styles)(CustomerRecords);
