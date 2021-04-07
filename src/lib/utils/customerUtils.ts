
import { CustomerRecord, MeterReadingRecord, SiteRecord, TariffPlanRecord } from '../../lib/airtable/interface';
import { isBeforeCurrentPeriod } from '../../lib/moment/momentUtils';
import { selectMeterReadingsByCustomerId } from '../../lib/redux/customerData';
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

export const getPeriodUsage = (currReading: MeterReadingRecord, startingMeter: MeterReadingRecord | undefined) => {
  const periodUsage = currReading.reading - (startingMeter ? startingMeter.reading : 0);
  return periodUsage;
}

export const getAmountBilled = (currReading: MeterReadingRecord) => {
  return currReading.amountBilled;
};

// TODO: add better error handling
export const getTariffPlan = (customer: CustomerRecord, currentSite: SiteRecord): TariffPlanRecord | undefined => {
  const tariffPlanId = customer.tariffPlanId;
  return currentSite.tariffPlans.find((plan: TariffPlanRecord) => plan.id === tariffPlanId);
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
