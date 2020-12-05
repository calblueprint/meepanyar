import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import Record from './Record';
import { PaymentRecord, MeterReadingRecord } from '../../utils/airtable/interface';

const styles = (theme: Theme) =>
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
  });

interface TabProps {
  classes: { scroll: string; tabs: string; tab: string; tabPanel: string };
  meterReadings: MeterReadingRecord[];
  payments: PaymentRecord[];
}

function TabMenu(props: TabProps) {
  const { classes, meterReadings, payments } = props;
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
          {meterReadings
            ? meterReadings.map((reading: MeterReadingRecord, index) => (
                <Record date={reading.date} used={reading.reading} amount={reading.amountBilled} key={index} />
              ))
            : null}
        </TabPanel>
        <TabPanel className={classes.tabPanel} value="1" id="payments">
          {payments
            ? payments.map((payment: PaymentRecord, index) => (
                <Record date={payment.date} amount={payment.amount} key={index} />
              ))
            : null}
        </TabPanel>
      </div>
    </TabContext>
  );
}

export default withStyles(styles)(TabMenu);
