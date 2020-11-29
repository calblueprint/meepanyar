import React from 'react';
import { Button, Typography, Tabs, Tab } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Record from '../components/Record';
import { InvoiceRecord, PaymentRecord, MeterReadingRecord } from '../utils/airtable/interface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scroll: {
      height: '70vh',
      overflow: 'auto',
    },
    tabs: {
      background: 'white',
    },
    tab: {
      color: `${theme.palette.divider}`,
      fontSize: '12px',
      '&:focus': {
        outline: 'none',
      },
    },
    tabPanel: {
      padding: '10px 0 0',
    },
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
  const changeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Tabs className={classes.tabs} textColor="primary" indicatorColor="primary" value={value} onChange={changeTab}>
        <Tab className={classes.tab} label="Invoices" value="0" />
        <Tab className={classes.tab} label="Payment" value="1" />
      </Tabs>
      <div className={classes.scroll}>
        <TabPanel className={classes.tabPanel} value="0" id="invoices">
          {invoices.map((invoice: InvoiceRecord, index) => (
            <>
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
              <Record date={invoice.date} used={invoice.amount} amount={invoice.amount} key={index} />
            </>
          ))}
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="1" id="payments">
          {payments.map((payment: MeterReadingRecord, index) => (
            <Record date={payment.date} amount={payment.reading} key={index} />
          ))}
        </TabPanel>
      </div>
    </TabContext>
  );
}
