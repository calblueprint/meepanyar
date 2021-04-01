/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import moment from 'moment';
import { InventoryRecord, InventoryUpdateRecord, ProductRecord, PurchaseRequestRecord } from '../airtable/interface';
import { setCurrSite } from './siteDataSlice';
import { RootState } from './store';

const inventoryUpdatesAdapter = createEntityAdapter<InventoryUpdateRecord>();
const productsAdapter = createEntityAdapter<ProductRecord>();
const siteInventoryAdapter = createEntityAdapter<InventoryRecord>();
const purchaseRequestsAdapter = createEntityAdapter<PurchaseRequestRecord>({
  // Sort by descending timestamp
  sortComparer: (a, b) => moment(b.createdAt).diff(a.createdAt),
});

// Customized selectors for inventory updates
export const {
  selectEntities: selectAllInventoryUpdates,
  selectAll: selectAllInventoryUpdatesArray,
  selectById: selectInventoryUpdateById,
  selectIds: selectInventoryUpdateIds,
} = inventoryUpdatesAdapter.getSelectors(
  (state: RootState) => state.inventoryData.sitesInventory[state.siteData.currentSite.id].inventoryUpdates,
);

// Customized selectors for products
export const {
  selectEntities: selectAllProducts,
  selectAll: selectAllProductsArray,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state: RootState) => state.inventoryData.products);

// Customized selectors for site inventory
export const {
  selectEntities: selectAllCurrentSiteInventory,
  selectAll: selectAllCurrentSiteInventoryArray,
  selectById: selectCurrentSiteInventoryById,
  selectIds: selectCurrentSiteInventoryIds,
} = siteInventoryAdapter.getSelectors(
  (state: RootState) => state.inventoryData.sitesInventory[state.siteData.currentSite.id].siteInventory,
);

// Customized selectors for purchase requests
export const {
  selectEntities: selectAllCurrentSitePurchaseRequests,
  selectAll: selectAllCurrentSitePurchaseRequestsArray,
  selectById: selectCurrentSitePurchaseRequestById,
  selectIds: selectCurrentSitePurchaseRequestsIds,
} = purchaseRequestsAdapter.getSelectors(
  (state: RootState) => state.inventoryData.sitesInventory[state.siteData.currentSite.id].purchaseRequests,
);

export interface SiteInventoryData {
  siteInventory: EntityState<InventoryRecord>;
  purchaseRequests: EntityState<PurchaseRequestRecord>;
  inventoryUpdates: EntityState<InventoryUpdateRecord>;
}

export const EMPTY_SITE_INVENTORY_DATA: SiteInventoryData = {
  siteInventory: siteInventoryAdapter.getInitialState(),
  purchaseRequests: purchaseRequestsAdapter.getInitialState(),
  inventoryUpdates: inventoryUpdatesAdapter.getInitialState(),
};

// Aliases for readability
export type SiteIdString = string;
export type ProductIdString = string;

interface inventoryDataSliceState {
  products: EntityState<ProductRecord>;
  sitesInventory: Record<SiteIdString, SiteInventoryData>;
  currentInventoryId: string;
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
};

export enum PurchaseRequestStatus {
  APPROVED = 'Approved',
  DENIED = 'Denied',
  PENDING = 'Pending',
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
      const { siteId, products, inventory, purchaseRequests, inventoryUpdates } = action.payload;
      const productEntities = productsAdapter.addMany(state.products, products);
      state.products = productEntities;

      state.sitesInventory[siteId] = JSON.parse(JSON.stringify(EMPTY_SITE_INVENTORY_DATA));

      const purchaseRequestEntities = purchaseRequestsAdapter.addMany(
        state.sitesInventory[siteId].purchaseRequests,
        purchaseRequests,
      );
      state.sitesInventory[siteId].purchaseRequests = purchaseRequestEntities;

      const siteInventoryEntities = siteInventoryAdapter.addMany(state.sitesInventory[siteId].siteInventory, inventory);
      state.sitesInventory[siteId].siteInventory = siteInventoryEntities;

      const inventoryUpdateEntities = inventoryUpdatesAdapter.addMany(
        state.sitesInventory[siteId].inventoryUpdates,
        inventoryUpdates,
      );
      state.sitesInventory[siteId].inventoryUpdates = inventoryUpdateEntities;
    },
    addInventory(state, action) {
      siteInventoryAdapter.addOne(state.sitesInventory[action.payload.siteId].siteInventory, action.payload);
    },
    addPurchaseRequest(state, action) {
      const { siteId, ...payload } = action.payload;
      purchaseRequestsAdapter.addOne(state.sitesInventory[siteId].purchaseRequests, payload);
    },
    updatePurchaseRequest(state, action) {
      const { siteId, id, ...changes } = action.payload;
      const update = {
        id,
        changes,
      };
      purchaseRequestsAdapter.updateOne(state.sitesInventory[siteId].purchaseRequests, update);
    },
    updateInventoryQuantity(state, action) {
      const siteId = action.payload.siteId;
      const update = {
        id: action.payload.inventoryId,
        changes: { currentQuantity: action.payload.newQuantity },
      };
      siteInventoryAdapter.updateOne(state.sitesInventory[siteId].siteInventory, update);
    },
    setCurrInventoryId(state, action) {
      state.currentInventoryId = action.payload;
    },
  },
  extraReducers: {
    // If the site changes, reset currentInventoryId
    [setCurrSite.type]: (state, action) => {
      state.currentInventoryId = initialState.currentInventoryId;
    },
  },
});

export const {
  saveInventoryData,
  addInventory,
  addPurchaseRequest,
  updatePurchaseRequest,
  updateInventoryQuantity,
  setCurrInventoryId,
} = inventoryDataSlice.actions;
export default inventoryDataSlice.reducer;
