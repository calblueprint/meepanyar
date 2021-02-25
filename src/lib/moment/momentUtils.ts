import moment from 'moment';

// Returns a string of the local date time in YYYY-MM-DD HH:mm:ss
// given a DateTime string in UTC serialized by redux (like UserData)
export const formatUTCDateStringToLocal = (dateStringUTC: string): string => {
  return moment(dateStringUTC).local().format('YYYY-MM-DD HH:mm:ss');
};

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
  const year = moment().year();
  let month = moment().month();
  if (month === 0) {
    month = 12;
  }
  return year + "-" + month.toString().padStart(2, "0");
}
