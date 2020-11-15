import React from 'react';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import { MeterReadingRecord } from '../../utils/airtable/interface';
import { PaymentRecord } from '../../utils/airtable/interface';

interface CustomerRecordsProps {
  classes: any;
  location: any;
}

function CustomerRecords(props: CustomerRecordsProps) {
  const payments: PaymentRecord[] = props.location.state.payments;
  const meterReadings: MeterReadingRecord[] = props.location.state.meterReadings;

  return (
    <>
      <BaseHeader leftIcon="backNav" />
      <h3>Payments</h3>
      {payments
        ? payments.map((payment: PaymentRecord) => <p key={payment.rid}>{`${payment.date} ${payment.amount}`}</p>)
        : null}

      <h3>Invoices</h3>
      {meterReadings
        ? meterReadings.map((meterReading: MeterReadingRecord) => (
            <p key={meterReading.rid}>{`${meterReading.date} ${meterReading.amountBilled}`}</p>
          ))
        : null}
    </>
  );
}

export default CustomerRecords;
