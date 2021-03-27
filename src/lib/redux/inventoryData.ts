import { createSelector } from '@reduxjs/toolkit';
import { InventoryRecord, PurchaseRequestRecord, SiteRecord } from '../airtable/interface';
import { addInventory, addPurchaseRequest, EMPTY_INVENTORY, saveInventoryData, selectCurrentSiteInventoryById, selectProductById, setCurrInventoryId, updateInventoryQuantity, updatePurchaseRequest } from './inventoryDataSlice';
import { getCurrentSite } from './siteData';
import { RootState, store } from './store';

export const currentInventoryIdSelector = (state: RootState) => state.inventoryData.currentInventoryId;
export const currentInventorySelector = createSelector(currentInventoryIdSelector, store.getState, (currentInventoryId, state) => selectCurrentSiteInventoryById(state, currentInventoryId));
export const currentInventoryProductSelector = createSelector(currentInventorySelector, store.getState, (inventory, state) => selectProductById(state, inventory?.productId || ""));

const refreshInventoryData = (site: SiteRecord) : void => {
  if (site) { // TODO @wangannie what to do if site null
    const {products, inventory, purchaseRequests, inventoryUpdates } = site;
    const siteId = site.id;
    const inventoryData = {
      siteId,
      products,
      inventory,
      purchaseRequests,
      inventoryUpdates
    }
    store.dispatch(saveInventoryData(inventoryData));
  }
};

const addInventoryToRedux = (inventory: InventoryRecord): void => {
  store.dispatch(addInventory(inventory));
};

const addPurchaseRequestToRedux = (purchaseRequest: PurchaseRequestRecord): void => {
  const purchaseRequestData = {
    ...purchaseRequest,
    siteId: getCurrentSite().id
  }
  store.dispatch(addPurchaseRequest(purchaseRequestData));
}

const updatePurchaseRequestInRedux = (purchaseRequest: Partial<PurchaseRequestRecord>): void => {
  const purchaseRequestUpdates = {
    ...purchaseRequest,
    siteId: getCurrentSite().id
  }
  store.dispatch(updatePurchaseRequest(purchaseRequestUpdates));
}

const updateInventoryQuantityInRedux = (inventoryId: string, newQuantity: number) : void => {
  const updateData = {
    inventoryId,
    newQuantity,
    siteId: getCurrentSite().id,
  }
  store.dispatch(updateInventoryQuantity(updateData));
}

// Gets the current quantity of an inventory item given its id
const getInventoryCurrentQuantity = (inventoryId: string): number => {
  const inventory = selectCurrentSiteInventoryById(store.getState(), inventoryId) || EMPTY_INVENTORY;
  return inventory.currentQuantity;
}

const setCurrentInventoryIdInRedux = (inventoryId: string): void => {
  store.dispatch(setCurrInventoryId(inventoryId));
}

export { refreshInventoryData, addInventoryToRedux, addPurchaseRequestToRedux, updatePurchaseRequestInRedux, updateInventoryQuantityInRedux, getInventoryCurrentQuantity, setCurrentInventoryIdInRedux };

