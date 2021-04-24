import moment from 'moment';
import { selectCurrentSiteGracePeriod } from '../redux/siteData';
import { store } from '../redux/store';

// Returns a string of the local date & time in a language- and timezone-sensitive format
// given a DateTime string.
export const formatDateStringToLocal = (dateString: string, excludeTime?: boolean): string => {

  let options: Intl.DateTimeFormatOptions;

  if (excludeTime) {
    options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
  } else {
    options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
  }

  return moment(dateString).local().toDate().toLocaleString(undefined, options);
};

export const isBeforeCurrentPeriod = (dateString: string): boolean => {
  const inputDate = moment(dateString);
  const periodStartDate = moment().startOf('month');
  return inputDate.valueOf() < periodStartDate.valueOf();
}

// Returns and calculates period from date
// Will be formatted as YYYY-MM
export const getPeriodFromDate = (date: string) => {
  return date.slice(0, 7).toString();
}

export const getCurrentPeriod = () => {
  const year = moment().year();
  const month = moment().month() + 1;
  return year + "-" + month.toString().padStart(2, "0");
}

export const getNextPeriod = () => {
  let year = moment().year();
  let month = moment().month();
  if (month == 11) {
    month = 1;
    year += 1;
  } else {
    month += 2;
  }
  return year + "-" + month.toString().padStart(2, "0");
}

export const getLastPeriod = () => {
  let year = moment().year();
  // Last month is retrieved directly from moment's month() because of 0 indexing
  let month = moment().month();
  if (month === 0) {
    month = 12;
    year -= 1;
  }
  return year + "-" + month.toString().padStart(2, "0");
}

// Returns difference between two periods in milliseconds
export const getDiffinPeriods = (x: string, y: string) => {
  const dateX: Date = new Date(x);
  const dateY: Date = new Date(y);
  const diff: number = Math.abs(dateY.getTime() - dateX.getTime());
  return diff;
}

// Returns the grace period applied to the current month.
// All meter readings logged after this date are for the current month's period
export const getCurrentMonthGracePeriodDeadline = () => {
  const gracePeriodDays: number = selectCurrentSiteGracePeriod(store.getState()) || 0;
  return moment().startOf('month').add(gracePeriodDays, 'days');
}
