/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SiteRecord, CustomerRecord, FinancialSummaryRecord } from '../airtable/interface';

interface siteDataSliceState {
  isLoading: boolean;
  currentSite: any; //TODO: Set as SiteRecord | null and resolve errors
  currentCustomer: CustomerRecord | null;
  sites: any[];
}

//TODO @julianrkung: Change sites to siteIdsToSites and change currentSite to currentSiteId
const initialState: siteDataSliceState = {
  isLoading: false,
  currentSite: null,
  currentCustomer: null,
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
  },
});

export const { setLoadingForSiteData, saveSiteData, setCurrSite } = siteDataSlice.actions;
export default siteDataSlice.reducer;
