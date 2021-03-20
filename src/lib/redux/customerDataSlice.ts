/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SiteRecord, FinancialSummaryRecord, CustomerRecord } from '../airtable/interface';

interface siteDataSliceState {
    siteIdsToCustomers: { [key: string]: CustomerRecord };
    currentCustomerId: string;
}

const initialState: siteDataSliceState = {
    siteIdsToCustomers: {},
    currentCustomerId: ''
};

export const EMPTY_CUSTOMER: CustomerRecord = {
    id: '',
    name: '',
    meterNumber: 0,
    tariffPlanId: '',
    isactive: false,
    hasmeter: false,
    outstandingBalance: '',
    meterReadingIds: [],
    meterReadings: [],
    paymentIds: [],
    payments: [],
    customerUpdateIds: [],
    customerUpdates: [];
    totalAmountBilledfromInvoices: 0;
    totalAmountPaidfromPayments: 0;
}

const customerDataSlice = createSlice({
    name: 'customerData',
    initialState,
    reducers: {
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
                currentSite: {
                    ...state.currentSite,
                    customers: [
                        ...state.currentSite.customers, action.payload
                    ]
                }
            }
        }
    },
});

export const { setLoadingForSiteData, saveSiteData, setCurrSite, addCustomer } = customerDataSlice.actions;
export default customerDataSlice.reducer;