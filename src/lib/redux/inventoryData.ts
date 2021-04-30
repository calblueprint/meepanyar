import { createSelector } from '@reduxjs/toolkit';
import {
  InventoryRecord,
  InventoryUpdateRecord,
  ProductRecord,
  PurchaseRequestRecord,
  SiteRecord
} from '../airtable/interface';
import {
  addInventory,
  addInventoryUpdate,
  addProduct,
  addPurchaseRequest,
  EMPTY_INVENTORY,
  PurchaseRequestStatus,
  saveInventoryData,
  selectAllCurrentSitePurchaseRequestsArray,
  selectAllInventoryUpdatesArray,
  selectCurrentSiteInventoryById,
  selectCurrentSitePurchaseRequestById,
  selectProductById,
  setCurrInventoryId,
  setCurrPurchaseRequestId,
  updateInventoryQuantity,
  updatePurchaseRequest
} from './inventoryDataSlice';
import { selectCurrentSiteId } from './siteData';
import { isBeforeCurrentPeriod } from '../moment/momentUtils';
import { RootState, store } from './store';

const getInventoryId = (_: RootState, inventoryId: string) => inventoryId;

const getPurchaseRequestId = (_: RootState, purchaseRequestId: string) => purchaseRequestId;

export const selectPurchaseRequestsArrayByInventoryId = createSelector(
  selectAllCurrentSitePurchaseRequestsArray,
  getInventoryId,
  (purchaseRequestsArray, inventoryId) =>
    purchaseRequestsArray.filter((purchaseRequest) => purchaseRequest.inventoryId === inventoryId),
);

export const selectInventoryUpdatesArrayByInventoryId = createSelector(
  selectAllInventoryUpdatesArray,
  getInventoryId,
  (inventoryUpdatesArray, inventoryId) => inventoryUpdatesArray.filter((update) => update.inventoryId === inventoryId),
);

export const selectProductIdByInventoryId = createSelector(
  getInventoryId,
  store.getState,
  (inventoryId, state) => selectCurrentSiteInventoryById(state, inventoryId)?.productId,
);

export const selectProductByInventoryId = createSelector(getInventoryId, store.getState, (inventoryId, state) =>
  selectProductById(state, selectProductIdByInventoryId(state, inventoryId) || ''),
);

// Custom selectors for current inventory and product
export const selectCurrentInventoryId = (state: RootState): string => state.inventoryData.currentInventoryId;
export const selectCurrentPurchaseRequestId = (state: RootState): string =>
  state.inventoryData.currentPurchaseRequestId;

export const selectCurrentInventory = createSelector(
  selectCurrentInventoryId,
  store.getState,
  (currentInventoryId, state) => selectCurrentSiteInventoryById(state, currentInventoryId),
);

export const selectCurrentInventoryProduct = createSelector(
  selectCurrentInventoryId,
  store.getState,
  (inventoryId, state) => selectProductByInventoryId(state, inventoryId),
);

export const selectCurrentPurchaseRequest = createSelector(
  selectCurrentPurchaseRequestId,
  store.getState,
  (currentPurchaseRequestId, state) => selectCurrentSitePurchaseRequestById(state, currentPurchaseRequestId),
);

export const selectPendingPurchaseRequestCount = createSelector(
  selectAllCurrentSitePurchaseRequestsArray,
  (purchaseRequests) => purchaseRequests.filter((pr) => pr.status === PurchaseRequestStatus.PENDING).length,
);

export const refreshInventoryData = (site: SiteRecord): void => {
  if (site) {
    // TODO @wangannie what to do if site null
    const { products, inventory, purchaseRequests, inventoryUpdates } = site;
    const siteId = site.id;
    const inventoryData = {
      siteId,
      products,
      inventory,
      purchaseRequests,
      inventoryUpdates,
    };
    store.dispatch(saveInventoryData(inventoryData));
  }
};

export const addInventoryToRedux = (inventory: InventoryRecord): void => {
  store.dispatch(addInventory(inventory));
};

export const addPurchaseRequestToRedux = (purchaseRequest: PurchaseRequestRecord): void => {
  const purchaseRequestData = {
    ...purchaseRequest,
    siteId: selectCurrentSiteId(store.getState()),
  };
  store.dispatch(addPurchaseRequest(purchaseRequestData));
};

export const updatePurchaseRequestInRedux = (purchaseRequest: Partial<PurchaseRequestRecord>): void => {
  const purchaseRequestUpdates = {
    ...purchaseRequest,
    siteId: selectCurrentSiteId(store.getState()),
  };
  store.dispatch(updatePurchaseRequest(purchaseRequestUpdates));
};

export const addInventoryUpdateToRedux = (inventoryUpdate: InventoryUpdateRecord): void => {
  const inventoryUpdateData = {
    ...inventoryUpdate,
    siteId: selectCurrentSiteId(store.getState()),
  };
  store.dispatch(addInventoryUpdate(inventoryUpdateData));
};

export const updateInventoryQuantityInRedux = (inventoryId: string, newQuantity: number): void => {
  const updateData = {
    inventoryId,
    newQuantity,
    siteId: selectCurrentSiteId(store.getState()),
  };
  store.dispatch(updateInventoryQuantity(updateData));
};

// Gets the current quantity of an inventory item given its id
export const getInventoryCurrentQuantity = (inventoryId: string): number => {
  const inventory = selectCurrentSiteInventoryById(store.getState(), inventoryId) || EMPTY_INVENTORY;
  return inventory.currentQuantity;
};

export const setCurrentInventoryIdInRedux = (inventoryId: string): void => {
  store.dispatch(setCurrInventoryId(inventoryId));
};

export const setCurrentPurchaseRequestIdInRedux = (purchaseRequestId: string): void => {
  store.dispatch(setCurrPurchaseRequestId(purchaseRequestId));
};

export const addProductToRedux = (product: ProductRecord): void => {
  store.dispatch(addProduct(product));
};

export const selectCurrentPeriodPurchaseRequestsApprovedTotalAmountSpent = createSelector(
    selectAllCurrentSitePurchaseRequestsArray,
    (purchaseRequests) => {
      let amount = 0;
      purchaseRequests.forEach((pr: PurchaseRequestRecord) => {
        if (!isBeforeCurrentPeriod(pr.createdAt) && pr.status === PurchaseRequestStatus.APPROVED) {
          amount += pr.amountSpent;
        }
      });
      return amount;
    }
)

export const selectCurrentPeriodPurchaseRequestsDeniedTotalAmountSpent = createSelector(
  selectAllCurrentSitePurchaseRequestsArray,
  (purchaseRequests) => {
    let amount = 0;
    purchaseRequests.forEach((pr: PurchaseRequestRecord) => {
      if (!isBeforeCurrentPeriod(pr.createdAt) && pr.status === PurchaseRequestStatus.DENIED) {
        amount += pr.amountSpent;
      }
    });
    return amount;
  }
)
