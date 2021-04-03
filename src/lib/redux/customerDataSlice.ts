/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { CustomerRecord, SiteId } from '../airtable/interface';
import { setCurrSite } from './siteDataSlice';
import { RootState } from './store';

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

const customersAdapter = createEntityAdapter<CustomerRecord>();

// Returns customers in the context of the current site
export const {
    selectEntities: selectAllCustomers,
    selectAll: selectAllCustomersArray,
    selectById: selectCustomerById,
    selectIds: selectCustomerIds
} = customersAdapter.getSelectors(
    (state: RootState) => state.customerData.sitesCustomers[state.siteData.currentSite.id]);

// TODO: @julianrkung, We should eventually make this a Record<SiteId, Record<CustomerId, CustomerRecord>> map for efficiency
// We can't do this yet because customers created while offline do not receive an id yet
interface customerDataSliceState {
    sitesCustomers: Record<SiteId, EntityState<CustomerRecord>>;
    currentCustomerId: string;
}

const initialState: customerDataSliceState = {
    sitesCustomers: {},
    currentCustomerId: EMPTY_CUSTOMER.id,
};

const customerDataSlice = createSlice({
    name: 'customerData',
    initialState,
    reducers: {
        saveCustomerData(state, action) {
            for (const [siteId, siteCustomers] of Object.entries(action.payload)) {
                state.sitesCustomers[siteId] = customersAdapter.getInitialState();
                state.sitesCustomers[siteId] = customersAdapter.addMany(state.sitesCustomers[siteId], siteCustomers as CustomerRecord[]);
            }
        },
        setCurrentCustomerId(state, action) {
            state.currentCustomerId = action.payload
        },
        addCustomer(state, action) {
            const customer: CustomerRecord = action.payload.customer;
            const siteId: SiteId = action.payload.siteId;

            customersAdapter.addOne(state.sitesCustomers[siteId], customer);
        },
        editCustomer(state, action) {
            const { siteId, id, ...changes } = action.payload;
            const update = {
                id,
                changes,
            };
            customersAdapter.updateOne(state.sitesCustomers[siteId], update);
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

export const { saveCustomerData, setCurrentCustomerId, addCustomer, editCustomer } = customerDataSlice.actions;
export default customerDataSlice.reducer;