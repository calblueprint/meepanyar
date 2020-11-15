import moment from 'moment';
import { createMeterReading, updateMeterReading } from '../utils/airtable/requests';
import { CustomerRecord, MeterReadingRecord } from '../utils/airtable/interface';

const isCurrentReading = (mr: MeterReadingRecord): boolean => {
  const period: number = parseInt(mr.date.slice(5, 7));
  const currPer: number = moment().month() + 1;
  return period == currPer;
};

const getCurrentReading = (customer: CustomerRecord): MeterReadingRecord | undefined => {
  return customer.meterReadings.find(function (mr: MeterReadingRecord) {
    return isCurrentReading(mr);
  });
};

const isStartingMeter = (mr: MeterReadingRecord): boolean => {
  const period: number = parseInt(mr.date.slice(5, 7)) % 12;
  const lastPer: number = moment().month();
  return period == lastPer;
};

const getStartingMeter = (customer: CustomerRecord): MeterReadingRecord | undefined => {
  return customer.meterReadings.find(function (mr: MeterReadingRecord) {
    return isStartingMeter(mr);
  });
};

const getAmountBilled = (customer: CustomerRecord, currReading: number, startingMeter = 0) => {
  const tariffPlan = customer.tariffPlans[0];
  const periodUsage = currReading - startingMeter;
  return tariffPlan.fixedTariff + tariffPlan.tariffByUnit * periodUsage;
};

export const addMeterReading = async (userId: string, customer: CustomerRecord, reading: number) => {
  const currReading = getCurrentReading(customer);
  const startingMeter: MeterReadingRecord | undefined = getStartingMeter(customer);
  if (currReading) {
    await updateMeterReading(
      currReading.rid,
      reading,
      getAmountBilled(customer, reading, startingMeter?.reading),
      moment().format('YYYY-MM-DD'),
    );
  } else {
    const meterReadingRecord = await createMeterReading(
      customer.meterNumber,
      reading,
      getAmountBilled(customer, reading, startingMeter?.reading),
      moment().format('YYYY-MM-DD'),
      customer.rid,
      userId,
    );
    customer.meterReadings.push(meterReadingRecord);
    customer.meterReadingIds.push(meterReadingRecord.rid);
  }
};
