import { InventoryRecord, ProductRecord, PurchaseRequestRecord, SiteRecord } from '../airtable/interface';
import { addInventory, addPurchaseRequest, EMPTY_PRODUCT, saveInventoryData, updateInventoryQuantity, updatePurchaseRequest } from './inventoryDataSlice';
import { getCurrentSite } from './siteData';
import { store } from './store';

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

export { refreshInventoryData, addInventoryToRedux, addPurchaseRequestToRedux, getProductByInventoryId, updatePurchaseRequestInRedux, updateInventoryQuantityInRedux, getInventoryCurrentQuantity };

