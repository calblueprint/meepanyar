import React from 'react';
import BaseHeader from '../../components/BaseComponents/BaseHeader';
import { InvoiceRecord, PaymentRecord } from '../../utils/airtable/interface';

interface CustomerRecordsProps {
  classes: any;
  location: any;
}

function CustomerRecords(props: CustomerRecordsProps) {
  const payments: PaymentRecord[] = props.location.state.payments;
  const invoices: InvoiceRecord[] = props.location.state.invoices;

  return (
    <>
      <BaseHeader leftIcon="backNav" />
      <h3>Payments</h3>
      {payments
        ? payments.map((payment: PaymentRecord) => <p key={payment.rid}>{`${payment.date} ${payment.amount}`}</p>)
        : null}

      <h3>Invoices</h3>
      {invoices
        ? invoices.map((invoice: InvoiceRecord) => <p key={invoice.rid}>{`${invoice.date} ${invoice.amountBilled}`}</p>)
        : null}
    </>
  );
}

export default CustomerRecords;
