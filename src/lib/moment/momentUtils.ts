import moment from 'moment';

// Returns a string of the local date time in YYYY-MM-DD HH:mm:ss
// given a DateTime string in UTC serialized by redux (like UserData)
export const formatUTCDateStringToLocal = (dateStringUTC: string): string => {
  return moment(dateStringUTC).local().format('YYYY-MM-DD HH:mm:ss');
};

//takes in a string of a date time YYYY-MM-DD format. Returns true if its before the current month.
export const lessThanCurrentMonth = (dateString: string): boolean => {
  let lastDate = moment(dateString);
  let lastMonth = lastDate.get('month');
  let currentMonth = moment().get('month');
  if (lastMonth < currentMonth) {
    return true;
  }
  return false;
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
