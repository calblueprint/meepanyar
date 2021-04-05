/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { CustomerRecord, MeterReadingRecord, PaymentRecord, SiteId } from '../airtable/interface';
import { setCurrSite } from './siteDataSlice';
import { RootState } from './store';
import moment from 'moment';

const customersAdapter = createEntityAdapter<CustomerRecord>();
const paymentsAdapter = createEntityAdapter<PaymentRecord>({
    // Sort by descending timestamp
    sortComparer: (a, b) => moment(b.date).diff(a.date),
});
const meterReadingsAdapter = createEntityAdapter<MeterReadingRecord>({
    // Sort by descending timestamp
    sortComparer: (a, b) => moment(b.date).diff(a.date),
});

// Returns customers in the context of the current site
export const {
    selectEntities: selectAllCustomers,
    selectAll: selectAllCustomersArray,
    selectById: selectCustomerById,
    selectIds: selectCustomerIds
} = customersAdapter.getSelectors(
    (state: RootState) => state.customerData.sitesCustomers[state.siteData.currentSite.id].customers);

export const {
    selectEntities: selectAllPayments,
    selectAll: selectAllPaymentsArray,
    selectById: selectPaymentById,
    selectIds: selectPaymentIds
} = paymentsAdapter.getSelectors(
    (state: RootState) => state.customerData.sitesCustomers[state.siteData.currentSite.id].payments);

export const {
    selectEntities: selectAllMeterReadings,
    selectAll: selectAllMeterReadingsArray,
    selectById: selectMeterReadingById,
    selectIds: selectMeterReadingIds
} = meterReadingsAdapter.getSelectors(
    (state: RootState) => state.customerData.sitesCustomers[state.siteData.currentSite.id].meterReadings);

interface SiteCustomerData {
    customers: EntityState<CustomerRecord>;
    payments: EntityState<PaymentRecord>;
    meterReadings: EntityState<MeterReadingRecord>;
}

// TODO: @julianrkung, We should eventually make this a Record<SiteId, Record<CustomerId, CustomerRecord>> map for efficiency
// We can't do this yet because customers created while offline do not receive an id yet
interface customerDataSliceState {
    sitesCustomers: Record<SiteId, SiteCustomerData>;
    currentCustomerId: string;
}

export const EMPTY_CUSTOMER: CustomerRecord = {
    id: '',
    name: '',
    meterNumber: 0,
    tariffPlanId: '',
    isactive: false,
    hasmeter: false,
    outstandingBalance: '',
    meterReadingIds: [],
    paymentIds: [],
    customerUpdateIds: [],
    customerUpdates: [],
    totalAmountBilledfromInvoices: 0,
    totalAmountPaidfromPayments: 0,
}

export const EMPTY_PAYMENT: PaymentRecord = {
    id: '',
    amount: 0,
    date: '',
    billedToId: '',
    collectedById: '',
}

export const EMPTY_METER_READING: MeterReadingRecord = {
    id: '',
    reading: 0,
    amountBilled: 0,
    date: '',
    meterNumber: -1,
    customerId: '',
}

export const EMPTY_SITE_CUSTOMER_DATA: SiteCustomerData = {
    customers: customersAdapter.getInitialState(),
    payments: paymentsAdapter.getInitialState(),
    meterReadings: meterReadingsAdapter.getInitialState(),
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
            const { siteId, payments, customers, meterReadings } = action.payload;
            state.sitesCustomers[siteId] = JSON.parse(JSON.stringify(EMPTY_SITE_CUSTOMER_DATA));

            const customerEntities = customersAdapter.addMany(state.sitesCustomers[siteId].customers, customers as CustomerRecord[]);
            state.sitesCustomers[siteId].customers = customerEntities;

            const paymentEntities = paymentsAdapter.addMany(state.sitesCustomers[siteId].payments, payments as PaymentRecord[]);
            state.sitesCustomers[siteId].payments = paymentEntities;

            const meterReadingEntities = meterReadingsAdapter.addMany(state.sitesCustomers[siteId].meterReadings, meterReadings as MeterReadingRecord[]);
            state.sitesCustomers[siteId].meterReadings = meterReadingEntities;
        },
        setCurrentCustomerId(state, action) {
            state.currentCustomerId = action.payload
        },
        addCustomer(state, action) {
            const customer: CustomerRecord = action.payload.customer;
            const siteId: SiteId = action.payload.siteId;

            customersAdapter.addOne(state.sitesCustomers[siteId].customers, customer);
        },
        updateCustomer(state, action) {
            const { siteId, id, ...changes } = action.payload;
            const update = {
                id,
                changes,
            };
            customersAdapter.updateOne(state.sitesCustomers[siteId].customers, update);
        },
        addPayment(state, action) {
            const { siteId, ...payload } = action.payload;
            paymentsAdapter.addOne(state.sitesCustomers[siteId].payments, payload);
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

export const { saveCustomerData, setCurrentCustomerId, addCustomer, updateCustomer, addPayment } = customerDataSlice.actions;
export default customerDataSlice.reducer;