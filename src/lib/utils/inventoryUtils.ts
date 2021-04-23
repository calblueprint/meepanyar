import moment, { Moment } from 'moment';
import { updatePurchaseRequest } from '../../lib/airtable/request';
import { InventoryUpdateRecord, PurchaseRequestRecord } from '../airtable/interface';
import { formatDateStringToLocal } from '../moment/momentUtils';
import {
  selectInventoryUpdatesArrayByInventoryId,
  selectPurchaseRequestsArrayByInventoryId,
  updatePurchaseRequestInRedux
} from '../redux/inventoryData';
import {
  EMPTY_INVENTORY,
  EMPTY_INVENTORY_UPDATE,
  EMPTY_PRODUCT,
  PurchaseRequestStatus,
  selectCurrentSiteInventoryById
} from '../redux/inventoryDataSlice';
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
  // Additional authentication against Airtable is done on the backend
  updatePurchaseRequest(purchaseRequest.id, reviewData);
  updatePurchaseRequestInRedux({ id: purchaseRequest.id, ...reviewData });
};

export const generateInventoryUpdate = (
  inventoryId: string,
  updatedAmount: number,
  userId: string,
  id?: string,
): any => {
  const inventory = selectCurrentSiteInventoryById(store.getState(), inventoryId);
  const inventoryUpdate = JSON.parse(JSON.stringify(EMPTY_INVENTORY_UPDATE)); // Make a deep copy of an empty record
  inventoryUpdate.userId = userId;
  inventoryUpdate.previousQuantity = inventory?.currentQuantity || 0;
  inventoryUpdate.updatedQuantity = updatedAmount;
  inventoryUpdate.inventoryId = inventoryId;
  inventoryUpdate.createdAt = moment().toISOString();
  inventoryUpdate.id = id || '';
  return inventoryUpdate;
};

export const generateInventory = (siteId: string, currentQuantity: number, productId: string, id?: string): any => {
  const inventory = JSON.parse(JSON.stringify(EMPTY_INVENTORY)); // Make a deep copy of an empty record
  inventory.siteId = siteId;
  inventory.currentQuantity = currentQuantity;
  inventory.periodStartQuantity = currentQuantity;
  inventory.productId = productId;
  inventory.id = id || '';
  return inventory;
};

export const generateProduct = (name: string, unit: string, id?: string): any => {
  const product = JSON.parse(JSON.stringify(EMPTY_PRODUCT)); // Make a deep copy of an empty record
  product.name = name;
  product.unit = unit;
  product.id = id || '';
  return product;
};
