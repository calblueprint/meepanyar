import React from 'react';
import { Typography } from '@material-ui/core';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import TabMenu from './components/TabMenu';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';
import { PaymentRecord, MeterReadingRecord } from '../../utils/airtable/interface';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      display: 'flex',
      flexDirection: 'column',
      margin: '0 25px',
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

  return (
    <BaseScreen leftIcon="backNav">
      <div className={classes.content}>
        <Typography variant="h1">Records</Typography>
        <TabMenu invoices={invoices} payments={payments} />
      </div>
    </BaseScreen>
  );
}

export default withStyles(styles)(CustomerRecords);
