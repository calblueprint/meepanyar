import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { createMeterReading, createInvoice } from '../../utils/airtable/requests';
import { CustomerRecord, TariffPlanRecord } from '../../utils/airtable/interface';

interface MeterReadingProps extends RouteComponentProps {
  location: any;
}

function AddMeterReading(props: MeterReadingProps) {
  const customer: CustomerRecord = props.location.state.customer;

  const getPeriodUsage = () => {
    const currReading = customer.meterReadings.find(function (mr) {
      return mr.isCurrentReading;
    });
    const startingMeter = customer.meterReadings.find(function (mr) {
      return mr.isStartingMeter;
    });
    return (currReading ? currReading.reading : 0) - (startingMeter ? startingMeter.reading : 0);
  };

  const getAmountBilled = (tariffPlan: TariffPlanRecord, periodUsage: number) => {
    return tariffPlan.fixedTariff + tariffPlan.tariffByUnit * periodUsage;
  };

  //TODO: check if current already exists, update records instead of creating new ones
  const onClick = async () => {
    const meterId = await createMeterReading(
      customer.meterNumber,
      234, //replace with user input
      customer.rid,
    );
    await createInvoice(
      customer.rid,
      'recKzFGFgYkr5ObUJ', //replace with user id
      getAmountBilled(customer.tariffPlans[0], getPeriodUsage()),
      meterId,
    );
  };

  return <button onClick={onClick}>Add Payment</button>;
}

export default AddMeterReading;
