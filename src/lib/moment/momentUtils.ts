import moment from 'moment';

// Returns a string of the local date time in YYYY-MM-DD HH:mm:ss
// given a DateTime string in UTC serialized by redux (like UserData)
export const formatUTCDateStringToLocal = (dateStringUTC: string): string => {
  return moment(dateStringUTC).local().format('YYYY-MM-DD HH:mm:ss');
};

// Returns month from date
export const getThisPeriod = (date: string) => {
  return parseInt(date.slice(5, 7));
}

export const getCurrentPeriod = () => {
  return moment().month() + 1;
}

export const getLastPeriod = () => {
  return moment().month();
}
