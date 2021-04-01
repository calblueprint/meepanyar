import moment from 'moment';
import { InventoryRecord } from '../airtable/interface';

// Calculate when an inventory record was last updated
export const getInventoryLastUpdated = (inventory: InventoryRecord) => {
  return '00/00/00 00:00pm'; // TODO @wangannie: replace with real calculation
};

// TODO @wangannie: fill in with real period calculation
export const getCurrentPeriod = (): number => {
  return moment().month();
};
