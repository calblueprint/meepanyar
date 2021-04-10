import moment, { Moment } from 'moment';
import { updatePurchaseRequest } from '../../lib/airtable/request';
import { InventoryUpdateRecord, PurchaseRequestRecord } from '../airtable/interface';
import { formatDateStringToLocal } from '../moment/momentUtils';
import {
  selectInventoryUpdatesArrayByInventoryId,
  selectPurchaseRequestsArrayByInventoryId,
  updatePurchaseRequestInRedux
} from '../redux/inventoryData';
import { PurchaseRequestStatus } from '../redux/inventoryDataSlice';
import { store } from '../redux/store';

// Calculate when an inventory record was last updated
export const getInventoryLastUpdated = (inventoryId: string): string => {
  const purchaseRequests: PurchaseRequestRecord[] = selectPurchaseRequestsArrayByInventoryId(
    store.getState(),
    inventoryId,
  );
  const inventoryUpdates: InventoryUpdateRecord[] = selectInventoryUpdatesArrayByInventoryId(
    store.getState(),
    inventoryId,
  );

  const updateTimes: Moment[] = [];
  purchaseRequests.map((pr) => updateTimes.push(moment(pr.createdAt)));
  inventoryUpdates.map((update) => updateTimes.push(moment(update.createdAt)));

  // Check because moment will incorrectly return the current time if updateTimes is empty
  if (updateTimes.length > 0) {
    return formatDateStringToLocal(moment.max(updateTimes).toISOString());
  }
  return 'Unknown'; // TODO @wangannie: address design edge case
};

// Get the full history of an inventory item including updates and purchase requests
// sorted from most to least recent createdAt date.
// TODO: cleanup to extract only relevant data points (?)
export const getInventoryHistory = (inventoryId: string): any[] => {
  const purchaseRequests: PurchaseRequestRecord[] = selectPurchaseRequestsArrayByInventoryId(
    store.getState(),
    inventoryId,
  );
  const inventoryUpdates: InventoryUpdateRecord[] = selectInventoryUpdatesArrayByInventoryId(
    store.getState(),
    inventoryId,
  );

  const history: any[] = [];
  history.push(...purchaseRequests);
  history.push(...inventoryUpdates);
  history.sort((a,b) => moment(b.createdAt).diff(a.createdAt));
  return history;
};

export const reviewPurchaseRequest = (purchaseRequest: PurchaseRequestRecord, approved: boolean, userId: string) => {
  const reviewData = {
    reviewerId: userId,
    reviewedAt: moment().toISOString(),
    status: approved ? PurchaseRequestStatus.APPROVED : PurchaseRequestStatus.DENIED,
  };
  updatePurchaseRequest(purchaseRequest.id, reviewData);
  updatePurchaseRequestInRedux({ id: purchaseRequest.id, ...reviewData });
}
