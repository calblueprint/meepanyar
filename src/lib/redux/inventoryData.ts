import { createSelector } from '@reduxjs/toolkit';
import { InventoryRecord, InventoryUpdateRecord, ProductRecord, PurchaseRequestRecord, SiteRecord } from '../airtable/interface';
import {
  addInventory,
  addInventoryUpdate,
  addProduct,
  addPurchaseRequest,
  EMPTY_INVENTORY,
  saveInventoryData,
  selectAllCurrentSitePurchaseRequestsArray,
  selectAllInventoryUpdatesArray,
  selectCurrentSiteInventoryById,
  selectProductById,
  setCurrInventoryId,
  updateInventoryQuantity,
  updatePurchaseRequest
} from './inventoryDataSlice';
import { selectCurrentSiteId } from './siteData';
import { RootState, store } from './store';


const getInventoryId = (_: RootState, inventoryId: string) => inventoryId;

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

export const addProductToRedux = (product: ProductRecord): void => {
  store.dispatch(addProduct(product));
};
