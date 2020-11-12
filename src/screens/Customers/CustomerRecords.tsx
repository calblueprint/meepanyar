import React from 'react';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import { InvoiceRecord, PaymentRecord, MeterReadingRecord } from '../../utils/airtable/interface';
import * as Styles from '../../styles/RecordsStyles';
import * as BaseStyles from '../../styles/CustomerStyles';
import Container from '@material-ui/core/Container';
import { TabContext, TabPanel } from '@material-ui/lab';
import Invoice from '../../components/Invoice';
import Payment from '../../components/Payment';

interface CustomerRecordsProps {
  classes: any;
  location: any;
}

function CustomerRecords(props: CustomerRecordsProps) {
  const meterReadings: MeterReadingRecord[] = props.location.state.meterReadings;
  const invoices: InvoiceRecord[] = props.location.state.invoices;
  const [value, setValue] = React.useState('0');
  const changeTab = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="xs">
      <BaseStyles.HeaderDiv>
        <BaseStyles.BackButton>
          <BaseStyles.BackArrow />
        </BaseStyles.BackButton>
        <Styles.HeaderText>Records</Styles.HeaderText>
      </BaseStyles.HeaderDiv>
      <Styles.MainDiv>
        <TabContext value={value}>
          <Styles.RecordAppBar position="static">
            <Styles.RecordTabs textColor="primary" indicatorColor="primary" value={value} onChange={changeTab}>
              <Styles.RecordTab label="Invoices" value="0" />
              <Styles.RecordTab label="Payment" value="1" />
            </Styles.RecordTabs>
          </Styles.RecordAppBar>
          <Styles.ScrollDiv>
            <TabPanel value="0" id="invoices">
              {invoices.map((invoice: InvoiceRecord, index) => (
                <Invoice date={invoice.date} used_kwh={invoice.amount} amount_ks={invoice.amount} />
              ))}
            </TabPanel>
            <TabPanel value="1" id="payments">
              {meterReadings.map((reading: MeterReadingRecord, index) => (
                <Payment date={reading.date} amount_ks={reading.reading} />
              ))}
            </TabPanel>
          </Styles.ScrollDiv>
        </TabContext>
      </Styles.MainDiv>
    </Container>
    /*
    <>
      <BaseHeader leftIcon="backNav" />
      <h3>Meter Readings</h3>
      {meterReadings.map((meterReading: MeterReadingRecord, index) => (
        <p key={meterReading.rid}>{`${meterReading.date} ${meterReading.reading}`}</p>
      ))}

      <h3>Invoices</h3>
      {invoices.map((invoice: InvoiceRecord, index) => (
        <p key={invoice.rid}>{`${invoice.date} ${invoice.amount}`}</p>
      ))}
    </>*/
  );
}

export default CustomerRecords;
