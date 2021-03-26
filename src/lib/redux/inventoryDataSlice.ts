/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { InventoryRecord, InventoryUpdateRecord, ProductRecord, PurchaseRequestRecord } from '../airtable/interface';

const inventoryUpdatesAdapter = createEntityAdapter<InventoryUpdateRecord>();

export interface SiteInventoryData {
  siteInventory: InventoryRecord[],
  purchaseRequests: PurchaseRequestRecord[],
  inventoryUpdates: EntityState<InventoryUpdateRecord>,
}


export const EMPTY_SITE_INVENTORY_DATA : SiteInventoryData = {
  siteInventory: [],
  purchaseRequests: [],
  inventoryUpdates: inventoryUpdatesAdapter.getInitialState(),
}

// Aliases for readability
export type SiteIdString = string;
export type ProductIdString = string; 

interface inventoryDataSliceState {
  products: Record<ProductIdString, ProductRecord>;
  sitesInventory: Record<SiteIdString, SiteInventoryData>;
  currentInventoryId: string,
}

const initialState: inventoryDataSliceState = {
  products: {},
  sitesInventory: {},
  currentInventoryId: '',
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

export const EMPTY_PRODUCT: ProductRecord = {
  id: '',
  unit: '',
  name: '',
};

export const EMPTY_INVENTORY_UPDATE: InventoryUpdateRecord = {
  id: '',
  userId: '',
  previousQuantity: 0,
  updatedQuantity: 0,
  inventoryId: '',
  period: 0,
};

export enum PurchaseRequestStatus {
  APPROVED = "Approved",
  DENIED = "Denied",
  PENDING = "Pending",
}

export const EMPTY_PURCHASE_REQUEST: PurchaseRequestRecord = {
  id: '',
  period: 0,
  notes: '',
  status: PurchaseRequestStatus.PENDING,
  requesterId: '',
  createdAt: '',
  amountPurchased: 0.0,
  amountSpent: 0.0,
  inventoryId: '',
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
      state.sitesInventory[siteId] = siteInventoryData;
      
      const inventoryUpdateEntities = inventoryUpdatesAdapter.addMany(state.sitesInventory[siteId].inventoryUpdates, inventoryUpdates);
      state.sitesInventory[siteId].inventoryUpdates = inventoryUpdateEntities;
    },
    addInventory(state, action) {
      state.sitesInventory[action.payload.siteId].siteInventory.push(action.payload);
    },
    addPurchaseRequest(state, action) {
      const siteId = action.payload.siteId;
      delete action.payload.siteId;
      state.sitesInventory[siteId].purchaseRequests.push(action.payload);
    },
    updatePurchaseRequest(state, action) {
      const siteId = action.payload.siteId;
      delete action.payload.siteId;
      const index = state.sitesInventory[siteId].purchaseRequests.findIndex(pr => pr.id === action.payload.id);
      state.sitesInventory[siteId].purchaseRequests[index] = action.payload;
    },
    updateInventoryQuantity(state, action) {
      const siteId = action.payload.siteId;
      const inventoryIndex = state.sitesInventory[siteId].siteInventory.findIndex(inv => inv.id === action.payload.inventoryId);
      state.sitesInventory[siteId].siteInventory[inventoryIndex].currentQuantity = action.payload.newQuantity;
    },
    setCurrInventoryId(state, action) {
      state.currentInventoryId = action.payload;
    }
  }
});

export const { saveInventoryData, addInventory, addPurchaseRequest, updatePurchaseRequest, updateInventoryQuantity, setCurrInventoryId } = inventoryDataSlice.actions;
export default inventoryDataSlice.reducer;
