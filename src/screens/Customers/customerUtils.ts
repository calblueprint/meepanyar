import { CustomerRecord, MeterReadingRecord } from '../../lib/airtable/interface';
import { getThisPeriod, getCurrentPeriod, getLastPeriod } from '../../lib/moment/momentUtils';

const isCurrentReading = (mr: MeterReadingRecord): boolean => {
    const period: number = getThisPeriod(mr.date);
    const currPer: number = getCurrentPeriod();
    return period == currPer;
};

//Returns last reading in the period
export const getCurrentReading = (customer: CustomerRecord): MeterReadingRecord | undefined => {
  return customer.meterReadings.find(function (mr: MeterReadingRecord) {
    return isCurrentReading(mr);
  });
};

const isStartingMeter = (mr: MeterReadingRecord): boolean => {
  const period: number = getThisPeriod(mr.date) % 12;
  const lastPer: number = getLastPeriod();
  return period == lastPer;
};

//Returns reading from last period
export const getStartingMeter = (customer: CustomerRecord): MeterReadingRecord | undefined => {
  return customer.meterReadings.find(function (mr: MeterReadingRecord) {
    return isStartingMeter(mr);
  });
};

export const getPeriodUsage = (currReading: MeterReadingRecord, startingMeter: MeterReadingRecord | undefined) => {
  const periodUsage = currReading.reading - (startingMeter? startingMeter.reading : 0);
  return periodUsage;
}

export const getAmountBilled = (currReading: MeterReadingRecord) => {
  return currReading.amountBilled;
};
