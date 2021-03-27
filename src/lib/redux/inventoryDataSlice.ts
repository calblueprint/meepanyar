/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { InventoryRecord, InventoryUpdateRecord, ProductRecord, PurchaseRequestRecord } from '../airtable/interface';
import { RootState } from './store';

const inventoryUpdatesAdapter = createEntityAdapter<InventoryUpdateRecord>();
const productsAdapter = createEntityAdapter<ProductRecord>();
const siteInventoryAdapter = createEntityAdapter<InventoryRecord>();

// Customized selectors for inventory updates
export const {
  selectEntities: selectAllInventoryUpdates,
  selectAll: selectAllInventoryUpdatesArray,
  selectById: selectInventoryUpdateById,
  selectIds: selectInventoryUpdateIds,
} = inventoryUpdatesAdapter.getSelectors((state: RootState) => state.inventoryData.sitesInventory[state.siteData.currentSite.id].inventoryUpdates);

// Customized selectors for products
export const {
  selectEntities: selectAllProducts,
  selectAll: selectAllProductsArray,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state: RootState) => state.inventoryData.products);

// Customized selectors for products
export const {
  selectEntities: selectAllCurrentSiteInventory,
  selectAll: selectAllCurrentSiteInventoryArray,
  selectById: selectCurrentSiteInventoryById,
  selectIds: selectCurrentSiteInventoryIds,
} = siteInventoryAdapter.getSelectors((state: RootState) => state.inventoryData.sitesInventory[state.siteData.currentSite.id].siteInventory);

export interface SiteInventoryData {
  siteInventory: EntityState<InventoryRecord>,
  purchaseRequests: PurchaseRequestRecord[],
  inventoryUpdates: EntityState<InventoryUpdateRecord>,
}

export const EMPTY_SITE_INVENTORY_DATA : SiteInventoryData = {
  siteInventory: siteInventoryAdapter.getInitialState(),
  purchaseRequests: [],
  inventoryUpdates: inventoryUpdatesAdapter.getInitialState(),
}

// Aliases for readability
export type SiteIdString = string;
export type ProductIdString = string; 

interface inventoryDataSliceState {
  products: EntityState<ProductRecord>;
  sitesInventory: Record<SiteIdString, SiteInventoryData>;
  currentInventoryId: string,
}

const initialState: inventoryDataSliceState = {
  products: productsAdapter.getInitialState(),
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
      const productEntities = productsAdapter.addMany(state.products, products);
      state.products = productEntities;
      
      const siteInventoryData = JSON.parse(JSON.stringify(EMPTY_SITE_INVENTORY_DATA));
      siteInventoryData.purchaseRequests = purchaseRequests;
      state.sitesInventory[siteId] = siteInventoryData;

      const siteInventoryEntities = siteInventoryAdapter.addMany(state.sitesInventory[siteId].siteInventory, inventory);
      state.sitesInventory[siteId].siteInventory = siteInventoryEntities;

      const inventoryUpdateEntities = inventoryUpdatesAdapter.addMany(state.sitesInventory[siteId].inventoryUpdates, inventoryUpdates);
      state.sitesInventory[siteId].inventoryUpdates = inventoryUpdateEntities;
    },
    addInventory(state, action) {
      siteInventoryAdapter.addOne(state.sitesInventory[action.payload.siteId].siteInventory, action.payload);
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
      const update = {
        id: action.payload.inventoryId,
        changes: { currentQuantity: action.payload.newQuantity } 
      }
      siteInventoryAdapter.updateOne(state.sitesInventory[siteId].siteInventory, update);
    },
    setCurrInventoryId(state, action) {
      state.currentInventoryId = action.payload;
    }
  }
});

export const { saveInventoryData, addInventory, addPurchaseRequest, updatePurchaseRequest, updateInventoryQuantity, setCurrInventoryId } = inventoryDataSlice.actions;
export default inventoryDataSlice.reducer;
