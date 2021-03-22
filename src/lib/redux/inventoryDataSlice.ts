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

// Aliases for readability
export type siteIdString = string;
export type productIdString = string; 

interface inventoryDataSliceState {
  products: Record<productIdString, ProductRecord>;
  sitesInventory: Record<siteIdString, SiteInventoryData>;
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
      const {siteId, products, inventory, purchaseRequests, inventoryUpdates} = action.payload;
      products.map((product: ProductRecord) => 
        state.products[product.id] = product
      );
      const siteData = JSON.parse(JSON.stringify(EMPTY_SITE_INVENTORY_DATA));
      siteData.siteInventory = inventory;
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
