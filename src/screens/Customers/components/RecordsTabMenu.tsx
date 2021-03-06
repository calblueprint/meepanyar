import React from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { TabContext, TabPanel } from '@material-ui/lab';
import { createStyles, withStyles, Theme } from '@material-ui/core/styles';
import Record from './Record';
import { PaymentRecord, MeterReadingRecord } from '../../../lib/airtable/interface';
import BaseScrollView from '../../../components/BaseComponents/BaseScrollView';
import { useInternationalization } from '../../../lib/i18next/translator';
import words from '../../../lib/i18next/words';

const styles = (theme: Theme) =>
  createStyles({
    tab: {
      fontSize: '12px',
      '&:focus': {
        outline: 'none',
      },
    },
    tabPanel: {
      height: '100%',
      padding: '10px 0 0',
    },
  });

interface RecordsTabMenuProps {
  classes: { tab: string; tabPanel: string };
  invoices: MeterReadingRecord[];
  payments: PaymentRecord[];
  defaultTab?: string;
}

function RecordsTabMenu(props: RecordsTabMenuProps) {
  const intl = useInternationalization(); 
  const { classes, invoices, payments, defaultTab } = props;
  const [value, setValue] = React.useState(defaultTab ? defaultTab : "0");
  const changeTab = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <Tabs textColor="primary" indicatorColor="primary" value={value} onChange={changeTab}>
        <Tab className={classes.tab} label={intl(words.invoices)}value="0" />
        <Tab className={classes.tab} label={intl(words.payment)} value="1" />
      </Tabs>
      <BaseScrollView>
        <TabPanel className={classes.tabPanel} value="0" id="invoices">
          {invoices
            ? invoices.map((invoice: MeterReadingRecord, index) => (
              <Record date={invoice.date} used={invoice.reading} amount={invoice.amountBilled} key={index} />
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
      </BaseScrollView>
    </TabContext>
  );
}
export default withStyles(styles)(RecordsTabMenu);
