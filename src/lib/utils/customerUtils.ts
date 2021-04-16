
import { CustomerRecord, MeterReadingRecord, SiteRecord, TariffPlanRecord } from '../../lib/airtable/interface';
import { isBeforeCurrentPeriod, getCurrentMonthGracePeriodDeadline } from '../../lib/moment/momentUtils';
import moment from 'moment';
import { selectMeterReadingsByCustomerId } from '../../lib/redux/customerData';
import { selectTariffPlanById } from '../../lib/redux/siteDataSlice';
import { store } from '../redux/store';

// Returns the last reading in the period or undefined if no reading has been made in the current period
export const getCurrentReading = (customer: CustomerRecord): MeterReadingRecord | undefined => {
  const meterReadings: MeterReadingRecord[] = selectMeterReadingsByCustomerId(store.getState(), customer.id);

  if (meterReadings.length && !isBeforeCurrentPeriod(meterReadings[0].date)) {
    return meterReadings[0];
  }
};

// Searches through meterReadings and find most recent reading that isn't from the current period
// Could be undefined if no other reading exists except current
export const getStartingReading = (customer: CustomerRecord): MeterReadingRecord | undefined => {
  const meterReadings: MeterReadingRecord[] = selectMeterReadingsByCustomerId(store.getState(), customer.id);

  // Meter readings are sorted from most to least recent so we return the first one before the current period
  for (const meterReading of meterReadings) {
    if (isBeforeCurrentPeriod(meterReading.date)) {
      return meterReading;
    }
  }
};

export const getPeriodUsage = (currReading: MeterReadingRecord, startingMeterReading : number) => {
  return currReading.reading - startingMeterReading;
}

export const getAmountBilled = (currReading: MeterReadingRecord) => {
  return currReading.amountBilled;
};

// TODO: add better error handling
export const getTariffPlanByCustomer = (customer: CustomerRecord): TariffPlanRecord | undefined => {
  return selectTariffPlanById(store.getState(), customer.tariffPlanId);
}

export const calculateAmountBilled = (reading: number, tariffPlan: TariffPlanRecord): number => {
  let amountCharged = tariffPlan.fixedTariff;

  if (reading <= tariffPlan.freeUnits) {
    amountCharged += tariffPlan.tariffByUnit * reading
  }

  return amountCharged
}

export const getLatestReadingDate = (customer: CustomerRecord): string => {
  const latestReading = getCurrentReading(customer);

  if (latestReading) {
    return latestReading.date
  } else {
    return 'No Readings'
  }
}

// We don't naively check if they were in the same month to avoid conflicts with meter readings made on the 1st of the month.
export const isReadingFromLatestPeriod = (meterReading: MeterReadingRecord): boolean => {
  const latestMeterReadingDate = moment(meterReading.date);
  return latestMeterReadingDate && latestMeterReadingDate.isSameOrAfter(getCurrentMonthGracePeriodDeadline())
}
