import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { CustomerRecord } from '../../utils/airtable/interface';
import { addMeterReading } from '../../utils/meterReadings';

interface MeterReadingProps extends RouteComponentProps {
  location: any;
}

function AddMeterReading(props: MeterReadingProps) {
  const customer: CustomerRecord = props.location.state.customer;

  const onClick = async () => {
    addMeterReading('recKzFGFgYkr5ObUJ', customer, 700); //replace with actual user rid and user input
  };

  return <button onClick={onClick}>Add Payment</button>;
}

export default AddMeterReading;
