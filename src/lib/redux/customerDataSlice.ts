/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CustomerRecord, SiteId, CustomerId } from '../airtable/interface';
import { setCurrSite } from './siteDataSlice';

interface customerDataSliceState {
    siteIdsToCustomers: Record<SiteId, Record<CustomerId, CustomerRecord>>;
    currentCustomerId: CustomerId;
}

const initialState: customerDataSliceState = {
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
    customerUpdates: [],
    totalAmountBilledfromInvoices: 0,
    totalAmountPaidfromPayments: 0,
}

const customerDataSlice = createSlice({
    name: 'customerData',
    initialState,
    reducers: {
        saveCustomerData(state, action) {
            const { siteIdsToCustomers } = action.payload;
            state.siteIdsToCustomers = siteIdsToCustomers;
        },
        setCurrentCustomerId(state, action) {
            const { id } = action.payload;
            state.currentCustomerId = id;
        },
        addCustomer(state, action) {
            const customer: CustomerRecord = action.payload.customer;
            const siteId: SiteId = action.payload.siteId;
            const customerId: CustomerId = customer.id;

            if (siteId && customerId) {
                state.siteIdsToCustomers[siteId][customerId] = customer;
            } else {
                console.log("Error occurred when adding a customer. No siteId or customerId passed")
            }
        }
    },
    extraReducers: {
        // When current site is changed, current customer id needs to be reset 
        // because it's no longer valid in the new site context.
        [setCurrSite.type]: (state, action) => {
            state.currentCustomerId = initialState.currentCustomerId;
        }
    }
});

export const { saveCustomerData, setCurrentCustomerId, addCustomer } = customerDataSlice.actions;
export default customerDataSlice.reducer;