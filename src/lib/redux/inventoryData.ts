import { createSelector } from '@reduxjs/toolkit';
import { InventoryRecord, ProductRecord, PurchaseRequestRecord, SiteRecord } from '../airtable/interface';
import { addInventory, addPurchaseRequest, EMPTY_INVENTORY, EMPTY_PRODUCT, saveInventoryData, setCurrInventoryId, updateInventoryQuantity, updatePurchaseRequest } from './inventoryDataSlice';
import { getCurrentSite } from './siteData';
import { RootState, store } from './store';

export const currentSiteSelector = (state: RootState) => state.siteData.currentSite;
export const sitesInventorySelector = (state: RootState) => state.inventoryData.sitesInventory;
export const allProductsSelector = (state: RootState) => state.inventoryData.products;
export const currentInventoryIdSelector = (state: RootState) => state.inventoryData.currentInventoryId;

export const currentSiteInventoryDataSelector = createSelector(currentSiteSelector, sitesInventorySelector, (currentSite, sitesInventory) => sitesInventory[currentSite.id]);
export const currentSiteInventorySelector = createSelector(currentSiteInventoryDataSelector, (siteInventoryData) => siteInventoryData.siteInventory);
export const currentSitePurchaseRequestsSelector = createSelector(currentSiteInventoryDataSelector, (siteInventoryData) => siteInventoryData.purchaseRequests);
export const currentInventorySelector = createSelector(currentSiteInventorySelector, currentInventoryIdSelector , (currentSiteInventory, currentInventoryId) => currentSiteInventory.find(inv => inv.id == currentInventoryId) || EMPTY_INVENTORY);
export const currentInventoryProductSelector = createSelector(currentInventorySelector, allProductsSelector, (inventory, products) => products[inventory.productId]);

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

const updatePurchaseRequestInRedux = (purchaseRequest: PurchaseRequestRecord): void => {
  const purchaseRequestData = {
    ...purchaseRequest,
    siteId: getCurrentSite().id
  }
  store.dispatch(updatePurchaseRequest(purchaseRequestData));
}

// Returns a product record by an inventory ID
const getProductByInventoryId = (inventoryId: string): ProductRecord => {
  const state = store.getState();
  const siteInventoryData = state.inventoryData.sitesInventory[getCurrentSite().id];
  const inventoryRecord = siteInventoryData.siteInventory.find((inv: InventoryRecord) => inv.id == inventoryId) || "";
  const products = state.inventoryData.products;
  if (inventoryRecord) {
    return products[inventoryRecord.productId];
  }
  return EMPTY_PRODUCT;
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
  const state = store.getState();
  const siteInventoryData = state.inventoryData.sitesInventory[getCurrentSite().id];
  const inventoryRecord = siteInventoryData.siteInventory.find((inv: InventoryRecord) => inv.id == inventoryId) || "";
  if (inventoryRecord) {
    return inventoryRecord.currentQuantity;
  }
  return 0;
}

const setCurrentInventoryIdInRedux = (inventoryId: string): void => {
  store.dispatch(setCurrInventoryId(inventoryId));
}

export { refreshInventoryData, addInventoryToRedux, addPurchaseRequestToRedux, getProductByInventoryId, updatePurchaseRequestInRedux, updateInventoryQuantityInRedux, getInventoryCurrentQuantity, setCurrentInventoryIdInRedux };

