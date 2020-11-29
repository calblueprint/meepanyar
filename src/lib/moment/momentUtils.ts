import moment from 'moment';

// Returns a string of the local date time in YYYY-MM-DD HH:mm:ss
// given a DateTime string in UTC serialized by redux (like UserData)
export const formatUTCDateStringToLocal = (dateStringUTC: string): string => {
  return moment(dateStringUTC).local().format('YYYY-MM-DD HH:mm:ss');
};
