/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SiteRecord, CustomerRecord, FinancialSummaryRecord } from '../airtable/interface';

interface siteDataSliceState {
  isLoading: boolean;
  currentSite: any;
  currentCustomer: any;
  sites: any[];
}

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

export const EMPTY_CUSTOMER: CustomerRecord = {
  id: '',
  name: '',
  meterNumber: 0,
  tariffPlanId: '',
  isactive: true,
  hasmeter: true,
  outstandingBalance: '',
  meterReadingIds: [],
  meterReadings: [],
  paymentIds: [],
  payments: [],
  customerUpdateIds: [],
  customerUpdates: [],
  totalAmountBilledfromInvoices: 0,
  totalAmountPaidfromPayments: 0,
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
    setCurrCustomer(state, action) {
      state.currentCustomer = action.payload;
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
      const stateCopy = JSON.parse(JSON.stringify(state));
      const index = stateCopy.currentSite.customers.findIndex((e: CustomerRecord) => e.id === action.payload.id);
      stateCopy.currentSite.customers[index] = action.payload;
      return stateCopy;
    }
  },
});

export const { setLoadingForSiteData, saveSiteData, setCurrSite, setCurrCustomer, addCustomer, editCustomer } = siteDataSlice.actions;
export default siteDataSlice.reducer;
