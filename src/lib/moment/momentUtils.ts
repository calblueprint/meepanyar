import moment from 'moment';

// Returns a string of the local date & time in a language- and timezone-sensitive format
// given a DateTime string.
export const formatDateStringToLocal = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const timeOfDay = moment(dateString).local().format('LT');
  const standardDate = moment(dateString).local().format('L');
  const revisedDate = standardDate.replace('/', '.').substring(0, standardDate.length - 5);
  const combinedString = timeOfDay + ' ' + revisedDate;
  //return moment(dateString).local().toDate().toLocaleString(undefined, options);
  return combinedString;
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
