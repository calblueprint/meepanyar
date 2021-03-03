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
