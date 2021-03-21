/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { InventoryRecord, InventoryUpdateRecord, ProductRecord } from '../airtable/interface';

export interface SiteInventoryData {
  siteInventory: [],
  purchaseRequests: [],
  inventoryUpdates: [],
}

const EMPTY_SITE_INVENTORY_DATA : SiteInventoryData = {
  siteInventory: [],
  purchaseRequests: [],
  inventoryUpdates: [],
}

interface inventoryDataSliceState {
  products: ProductRecord[];
  sitesInventory: Record<string, SiteInventoryData>;
}

const initialState: inventoryDataSliceState = {
  products: [],
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
      state.products = products;
      const siteData = JSON.parse(JSON.stringify(EMPTY_SITE_INVENTORY_DATA));
      siteData.siteInventory = currentSiteInventory;
      siteData.purchaseRequests = purchaseRequests;
      siteData.inventoryUpdates = inventoryUpdates;
      state.sitesInventory[siteId] = siteData;
    },
    addInventory(state, action) {
      return {
        ...state,
        sitesInventory: {
          ...state.sitesInventory, 
          [action.payload.siteId]: {
            ...state.sitesInventory[action.payload.siteId],
              siteInventory: [
                ...state.sitesInventory[action.payload.siteId].siteInventory,
                action.payload
              ]
            }
          }
        }
    },
  }
});

export const { saveInventoryData, addInventory } = inventoryDataSlice.actions;
export default inventoryDataSlice.reducer;
