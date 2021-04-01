import moment, { Moment } from 'moment';
import { InventoryRecord, InventoryUpdateRecord, PurchaseRequestRecord } from '../airtable/interface';
import { selectInventoryUpdatesArrayByInventoryId, selectPurchaseRequestsArrayByInventoryId } from '../redux/inventoryData';
import { store } from '../redux/store';

// Calculate when an inventory record was last updated
export const getInventoryLastUpdated = (inventory: InventoryRecord): string => {
  const purchaseRequests: PurchaseRequestRecord[] = selectPurchaseRequestsArrayByInventoryId(store.getState(), inventory.id);
  const inventoryUpdates: InventoryUpdateRecord[] = selectInventoryUpdatesArrayByInventoryId(store.getState(), inventory.id);

  const updateTimes: Moment[] = [];
  purchaseRequests.map((pr) => updateTimes.push(moment(pr.createdAt)));
  inventoryUpdates.map((update) => updateTimes.push(moment(update.createdAt)));

  // Check because moment will incorrectly return the current time if updateTimes is empty
  if (updateTimes.length > 0) {
    return moment.max(updateTimes).toLocaleString();
  }
  return 'Unknown'; // TODO @wangannie: address design edge case
};

// TODO @wangannie: fill in with real period calculation
export const getCurrentPeriod = (): number => {
  return moment().month();
};
