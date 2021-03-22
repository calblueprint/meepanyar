/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { CustomerRecord, SiteId } from '../airtable/interface';
import { setCurrSite } from './siteDataSlice';

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

// TODO: @julianrkung, We should eventually make this a Record<SiteId, Record<CustomerId, CustomerRecord>> map for efficiency
// We can't do this yet because customers created while offline do not receive an id yet
interface customerDataSliceState {
    siteIdsToCustomers: Record<SiteId, CustomerRecord[]>;
    currentCustomer: CustomerRecord;
}

const initialState: customerDataSliceState = {
    siteIdsToCustomers: {},
    currentCustomer: EMPTY_CUSTOMER,
};

const customerDataSlice = createSlice({
    name: 'customerData',
    initialState,
    reducers: {
        saveCustomerData(state, action) {
            const { siteIdsToCustomers } = action.payload;
            state.siteIdsToCustomers = siteIdsToCustomers;
        },
        setCurrentCustomer(state, action) {
            state.currentCustomer = action.payload;
        },
        addCustomer(state, action) {
            const customer: CustomerRecord = action.payload.customer;
            const siteId: SiteId = action.payload.siteId;

            if (siteId) {
                state.siteIdsToCustomers[siteId].push(customer);
            } else {
                console.log("Error occurred when adding a customer. No siteId or customerId passed")
            }
        }
    },
    extraReducers: {
        // When current site is changed, current customer id needs to be reset 
        // because it's no longer valid in the new site context.
        [setCurrSite.type]: (state, action) => {
            state.currentCustomer = initialState.currentCustomer;
        }
    }
});

export const { saveCustomerData, setCurrentCustomer, addCustomer } = customerDataSlice.actions;
export default customerDataSlice.reducer;