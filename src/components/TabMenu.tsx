import React from 'react';
import { Button, Typography, Container, AppBar, Tabs, Tab } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Record from '../components/Record';
import { InvoiceRecord, PaymentRecord, MeterReadingRecord } from '../utils/airtable/interface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: '10px',
      border: '1px solid',
      borderColor: theme.palette.divider,
      borderRadius: '6px',
    },
    scroll: {
      maxHeight: '380px',
      overflow: 'auto',
    },
    tabs: {
      background: 'white',
      outline: '3px solid white',
      border: '1px solid white',
    },
    tab: {
      color: '#e5e5e5',
      fontSize: '12px',
      '&:focus': {
        outline: 'none',
      }
    },
    appBar: {
      boxShadow: 'none',
    }
  }),
);

interface TabProps {
  invoices: InvoiceRecord[];
  payments: MeterReadingRecord[];
}

export default function TabMenu(props: TabProps) {
  const classes = useStyles();
  const invoices = props.invoices;
  const payments = props.payments;
  const [value, setValue] = React.useState('0');
  const changeTab = (event: any, newValue: string) => { setValue(newValue); };

  return (
    <TabContext value={value}>
      <AppBar className={classes.appBar} position="static">
        <Tabs className={classes.tabs} textColor="primary" indicatorColor="primary" value={value} onChange={changeTab}>
          <Tab className={classes.tab} label="Invoices" value="0" />
          <Tab className={classes.tab} label="Payment" value="1" />
        </Tabs>
      </AppBar>
      <div className={classes.scroll}>
        <TabPanel value="0" id="invoices">
          {invoices.map((invoice: InvoiceRecord, index) => (
            <Record date={invoice.date} used_kwh={invoice.amount} amount_ks={invoice.amount} />
          ))}
        </TabPanel>
        <TabPanel value="1" id="payments">
          {payments.map((payment: MeterReadingRecord, index) => (
            <Record date={payment.date} amount_ks={payment.reading} />
          ))}
        </TabPanel>
      </div>
    </TabContext>
  );
}
