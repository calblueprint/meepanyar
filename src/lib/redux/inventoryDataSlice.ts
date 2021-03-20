/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { InventoryRecord, InventoryUpdateRecord, ProductRecord, PurchaseRequestRecord } from '../airtable/interface';

interface inventoryDataSliceState {
  isLoading: boolean;
  products: ProductRecord[];
  siteInventory: InventoryRecord[];
  purchaseRequests: PurchaseRequestRecord[];
  inventoryUpdates: InventoryUpdateRecord[];
}

const initialState: inventoryDataSliceState = {
  isLoading: false,
  products: [],
  siteInventory: [],
  purchaseRequests: [],
  inventoryUpdates: [],
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
    setLoadingForInventoryData(state) {
      state.isLoading = true;
    },
    saveInventoryData(state, action) {
      const {products, currentSiteInventory, purchaseRequests, inventoryUpdates} = action.payload;
      state.products = products;
      state.siteInventory = currentSiteInventory;
      state.purchaseRequests = purchaseRequests;
      state.inventoryUpdates = inventoryUpdates;
      state.isLoading = false;
    },
    addInventory(state, action){
      return {
        ...state,
        siteInventory:[
          ...state.siteInventory, action.payload
        ]
      }
    },
  }
});

export const { setLoadingForInventoryData, saveInventoryData,addInventory } = inventoryDataSlice.actions;
export default inventoryDataSlice.reducer;
