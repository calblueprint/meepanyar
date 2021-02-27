
import { CustomerRecord, MeterReadingRecord } from '../../lib/airtable/interface';
import { getPeriodFromDate, getCurrentPeriod, getLastPeriod, getDiffinPeriods } from '../../lib/moment/momentUtils';

const isCurrentReading = (mr: MeterReadingRecord): boolean => {
    const period: string = getPeriodFromDate(mr.date);
    const currPer: string = getCurrentPeriod();
    return period === currPer;
};

// Returns last reading in the period
export const getCurrentReading = (customer: CustomerRecord): MeterReadingRecord | undefined => {
  return customer.meterReadings.find(isCurrentReading);
};

const isStartingReading = (mr: MeterReadingRecord): boolean => {
  const period: string = getPeriodFromDate(mr.date);
  const lastPer: string = getLastPeriod();
  return period === lastPer;
};

const getClosestReading = (x: MeterReadingRecord, y: MeterReadingRecord): MeterReadingRecord => {
  const currentPeriod: string = getCurrentPeriod();
  const diffX: number = getDiffinPeriods(currentPeriod, getPeriodFromDate(x.date));
  const diffY: number = getDiffinPeriods(currentPeriod, getPeriodFromDate(y.date));
  if (diffX < diffY) {
    return x;
  } else {
    return y;
  }
}

// Searches through meterReadings and find most recent reading that isn't from the current period
// Could be undefined if no other reading exists except current
export const getStartingReading = (customer: CustomerRecord): MeterReadingRecord | undefined => {
  let mostRecentReading: MeterReadingRecord | undefined;
  for (let i = 0; i < customer.meterReadings.length; i += 1) {
    const thisReading = customer.meterReadings[i];
    if (!isCurrentReading(thisReading)) {
      if (!mostRecentReading) {
        mostRecentReading = thisReading;
      } else {
        mostRecentReading = getClosestReading(thisReading, mostRecentReading);
      }
    }
  }
  return mostRecentReading;
};

export const getPeriodUsage = (currReading: MeterReadingRecord, startingMeter: MeterReadingRecord | undefined) => {
  const periodUsage = currReading.reading - (startingMeter? startingMeter.reading : 0);
  return periodUsage;
}

export const getAmountBilled = (currReading: MeterReadingRecord) => {
  return currReading.amountBilled;
};