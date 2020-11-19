import React from 'react';
import { Typography } from '@material-ui/core';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import TabMenu from '../../components/TabMenu';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Link, RouteComponentProps } from 'react-router-dom';
import { InvoiceRecord, PaymentRecord, MeterReadingRecord } from '../../utils/airtable/interface';

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
    scroll: {
      maxHeight: '380px',
      overflow: 'auto',
    }
  });

interface CustomerRecordsProps extends RouteComponentProps {
  classes: { root: string; content: string; header: string; scroll: string; };
  location: any;
}

function CustomerRecords(props: CustomerRecordsProps) {
  const { classes } = props;
  const payments: MeterReadingRecord[] = props.location.state.payments;
  const invoices: InvoiceRecord[] = props.location.state.invoices;

  return (
    <div className={classes.root}>
      <BaseHeader leftIcon="backNav" />
      <div className={classes.content}>
        <Typography variant="h1">Records</Typography>
        <TabMenu invoices={invoices} payments={payments} />
      </div>
    </div>
  );
}

export default withStyles(styles)(CustomerRecords);
