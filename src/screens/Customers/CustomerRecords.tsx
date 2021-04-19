import React from 'react';
import { Typography } from '@material-ui/core';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import RecordsTabMenu from './components/RecordsTabMenu';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { RouteComponentProps } from 'react-router-dom';
import { PaymentRecord, MeterReadingRecord } from '../../lib/airtable/interface';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

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
  const intl = useInternationalization(); 
  const { classes } = props;
  const payments: PaymentRecord[] = props.location.state.payments;
  const invoices: MeterReadingRecord[] = props.location.state.invoices;

  return (
    <BaseScreen leftIcon="backNav">
      <div className={classes.content}>
        <Typography variant="h1">{intl(words.records)}</Typography>
        <RecordsTabMenu invoices={invoices} payments={payments} />
      </div>
    </BaseScreen>
  );
}

export default withStyles(styles)(CustomerRecords);
