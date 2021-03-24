/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CustomerRecord, FinancialSummaryRecord, SiteRecord } from '../airtable/interface';

interface siteDataSliceState {
  isLoading: boolean;
  currentSite: any; //TODO: Set as SiteRecord | null and resolve errors
  sites: any[];
}

const initialState: siteDataSliceState = {
  isLoading: false,
  currentSite: null,
  sites: [],
};

export const EMPTY_SITE: SiteRecord = {
  id: '',
  name: '',
  customerIds: [],
  customers: [],
  financialSummaryIds: [],
  financialSummaries: [],
  tariffPlans: [],
};

export const EMPTY_FINANCIAL_SUMMARY: FinancialSummaryRecord = {
  id: '',
  name: '',
  totalCustomers: 0,
  totalCustomersBilled: 0,
  totalCustomersPaid: 0,
  totalUsage: 0,
  totalAmountBilled: 0,
  totalAmountCollected: 0,
  totalAmountSpent: 0,
  totalProfit: 0,
  period: '',
  isapproved: true,
  lastUpdated: '',
  issubmitted: false,
}

const siteDataSlice = createSlice({
  name: 'siteData',
  initialState,
  reducers: {
    setLoadingForSiteData(state) {
      state.isLoading = true;
    },
    saveSiteData(state, action) {
      const { sites, currentSite } = action.payload;
      state.sites = sites;
      state.currentSite = currentSite;
      state.isLoading = false;
    },
    setCurrSite(state, action) {
      state.currentSite = action.payload;
    },
    // TODO: @julianrkung move to customerDataSlice
    addCustomer(state, action) {
      return {
      ...state,
      currentSite:{
        ...state.currentSite,
        customers:[
          ...state.currentSite.customers, action.payload
        ]
        }
      }
    },
    editCustomer(state, action) {
      const index = state.currentSite.customers.findIndex((e: CustomerRecord) => e.id === action.payload.id);
      state.currentSite.customers[index] = action.payload;
    }
  },
});

export const { setLoadingForSiteData, saveSiteData, setCurrSite, addCustomer, editCustomer } = siteDataSlice.actions;
export default siteDataSlice.reducer;
