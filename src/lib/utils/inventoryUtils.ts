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

// Generate an InventoryUpdate record by making a copy of the EMPTY_INVENTORY_UPDATE record and filling in 
// an inventoryId, updatedAmount, and userId.
// NOTE: this function does not set/generate an id, so the object returned will have an empty ID that 
// must be filled in before using this object or adding it to the Redux store.
export const generateInventoryUpdateRecord = (
  inventoryId: string,
  updatedAmount: number,
  userId: string,
): any => {
  const inventory = selectCurrentSiteInventoryById(store.getState(), inventoryId);
  const inventoryUpdate = JSON.parse(JSON.stringify(EMPTY_INVENTORY_UPDATE)); // Make a deep copy of an empty record
  inventoryUpdate.userId = userId;
  inventoryUpdate.previousQuantity = inventory?.currentQuantity || 0;
  inventoryUpdate.updatedQuantity = updatedAmount;
  inventoryUpdate.inventoryId = inventoryId;
  inventoryUpdate.createdAt = moment().toISOString();
  return inventoryUpdate;
};

// Generate an Inventory record by making a copy of the EMPTY_INVENTORY record and filling in 
// a siteId, currentQuantity, and productId.
// NOTE: this function does not set/generate an id, so the object returned will have an empty ID that 
// must be filled in before using this object or adding it to the Redux store.
export const generateInventoryRecord = (siteId: string, currentQuantity: number, productId: string): any => {
  const inventory = JSON.parse(JSON.stringify(EMPTY_INVENTORY)); // Make a deep copy of an empty record
  inventory.siteId = siteId;
  inventory.currentQuantity = currentQuantity;
  inventory.periodStartQuantity = currentQuantity;
  inventory.productId = productId;
  return inventory;
};

// Generate an Product record by making a copy of the EMPTY_PRODUCT record and filling in 
// a name and unit.
// NOTE: this function does not set/generate an id, so the object returned will have an empty ID that 
// must be filled in before using this object or adding it to the Redux store.
export const generateProductRecord = (name: string, unit: string): any => {
  const product = JSON.parse(JSON.stringify(EMPTY_PRODUCT)); // Make a deep copy of an empty record
  product.name = name;
  product.unit = unit;
  return product;
};
