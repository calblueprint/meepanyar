/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { InventoryRecord, InventoryUpdateRecord, ProductRecord, PurchaseRequestRecord } from '../airtable/interface';

export interface SiteInventoryData {
  siteInventory: InventoryRecord[],
  purchaseRequests: PurchaseRequestRecord[],
  inventoryUpdates: InventoryUpdateRecord[],
}

export const EMPTY_SITE_INVENTORY_DATA : SiteInventoryData = {
  siteInventory: [],
  purchaseRequests: [],
  inventoryUpdates: [],
}

// Aliases for readability
export type SiteIdString = string;
export type ProductIdString = string; 

interface inventoryDataSliceState {
  products: Record<ProductIdString, ProductRecord>;
  sitesInventory: Record<SiteIdString, SiteInventoryData>;
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
      const siteInventoryData = JSON.parse(JSON.stringify(EMPTY_SITE_INVENTORY_DATA));
      siteInventoryData.siteInventory = inventory;
      siteInventoryData.purchaseRequests = purchaseRequests;
      siteInventoryData.inventoryUpdates = inventoryUpdates;
      state.sitesInventory[siteId] = siteInventoryData;
    },
    addInventory(state, action) {
      state.sitesInventory[action.payload.siteId].siteInventory.push(action.payload);
    },
  }
});

export const { saveInventoryData, addInventory } = inventoryDataSlice.actions;
export default inventoryDataSlice.reducer;
