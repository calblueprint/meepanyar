
import { CustomerRecord, MeterReadingRecord } from '../../lib/airtable/interface';
import { getPeriodFromDate, getCurrentPeriod, getLastPeriod } from '../../lib/moment/momentUtils';

const isCurrentReading = (mr: MeterReadingRecord): boolean => {
    const period: string = getPeriodFromDate(mr.date);
    const currPer: string = getCurrentPeriod();
    return period === currPer;
};

//Returns last reading in the period
export const getCurrentReading = (customer: CustomerRecord): MeterReadingRecord | undefined => {
  return customer.meterReadings.find(isCurrentReading);
};

const isStartingReading = (mr: MeterReadingRecord): boolean => {
  const period: string = getPeriodFromDate(mr.date);
  const lastPer: string = getLastPeriod();
  return period === lastPer;
};

//Returns reading from last period
export const getStartingReading = (customer: CustomerRecord): MeterReadingRecord | undefined => {
  return customer.meterReadings.find(isStartingReading);
};

export const getPeriodUsage = (currReading: MeterReadingRecord, startingMeter: MeterReadingRecord | undefined) => {
  const periodUsage = currReading.reading - (startingMeter? startingMeter.reading : 0);
  return periodUsage;
}

export const getAmountBilled = (currReading: MeterReadingRecord) => {
  return currReading.amountBilled;
};
