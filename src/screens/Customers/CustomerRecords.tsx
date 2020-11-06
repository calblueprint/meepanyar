import React from 'react';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import { InvoiceRecord, MeterReadingRecord } from '../../utils/airtable/interface';

interface CustomerRecordsProps {
  classes: any;
  location: any;
}

function CustomerRecords(props: CustomerRecordsProps) {
  const meterReadings: MeterReadingRecord[] = props.location.state.meterReadings;
  const invoices: InvoiceRecord[] = props.location.state.invoices;

  return (
    <>
      <BaseHeader leftIcon="backNav" />
      <h3>Meter Readings</h3>
      {meterReadings.map((meterReading: MeterReadingRecord, index) => (
        <p key={index}>{`${meterReading.date} ${meterReading.reading}`}</p>
      ))}

      <h3>Invoices</h3>
      {invoices.map((invoice: InvoiceRecord, index) => (
        <p key={index}>{`${invoice.date} ${invoice.amount}`}</p>
      ))}
    </>
  );
}

export default CustomerRecords;
