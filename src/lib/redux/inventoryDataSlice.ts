/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { InventoryRecord, InventoryUpdateRecord, ProductRecord, PurchaseRequestRecord } from '../airtable/interface';

export interface SiteInventoryData {
  siteInventory: InventoryRecord[],
  purchaseRequests: PurchaseRequestRecord[],
  inventoryUpdates: InventoryUpdateRecord[],
}

const EMPTY_SITE_INVENTORY_DATA : SiteInventoryData = {
  siteInventory: [],
  purchaseRequests: [],
  inventoryUpdates: [],
}

interface inventoryDataSliceState {
  products: Record<string, ProductRecord>;
  sitesInventory: Record<string, SiteInventoryData>;
}

const initialState: inventoryDataSliceState = {
  products: {},
  sitesInventory: {}
};

export const EMPTY_INVENTORY: InventoryRecord = {
  id: '',
  siteId: '',
  currentQuantity: 0,
  productId: '',
  purchaseRequestIds: [],
  inventoryUpdateIds: [],
  periodStartQuantity: 0,
};

export const EMPTY_INVENTORY_UPDATE: InventoryUpdateRecord = {
  id: '',
  userId: '',
  previousQuantity: 0,
  updatedQuantity: 0,
  inventoryId: '',
  period: 0,
};

const inventoryDataSlice = createSlice({
  name: 'inventoryData',
  initialState,
  reducers: {
    saveInventoryData(state, action) {
      const {siteId, products, currentSiteInventory, purchaseRequests, inventoryUpdates} = action.payload;
      products.map((product: ProductRecord) => 
        state.products[product.id] = product
      );
      const siteData = JSON.parse(JSON.stringify(EMPTY_SITE_INVENTORY_DATA));
      siteData.siteInventory = currentSiteInventory;
      siteData.purchaseRequests = purchaseRequests;
      siteData.inventoryUpdates = inventoryUpdates;
      state.sitesInventory[siteId] = siteData;
    },
    addInventory(state, action) {
      state.sitesInventory[action.payload.siteId].siteInventory.push(action.payload);
    },
  }
});

export const { saveInventoryData, addInventory } = inventoryDataSlice.actions;
export default inventoryDataSlice.reducer;
