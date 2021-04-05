import { CustomerRecord, PaymentRecord, SiteRecord } from '../airtable/interface';
import { addCustomer, setCurrentCustomerId, editCustomer, selectCustomerById, saveCustomerData, selectAllMeterReadingsArray } from './customerDataSlice';
import { getCurrentSiteId } from './siteData';
import { RootState, store } from './store';
import { createSelector } from '@reduxjs/toolkit';

export const refreshCustomerData = (site: SiteRecord): void => {
    if (site) {
        const { customers, payments, meterReadings } = site;
        const siteId = site.id;
        const customerData = {
            siteId,
            customers,
            payments,
            meterReadings
        };
        store.dispatch(saveCustomerData(customerData));
    }
};

export const addCustomerToRedux = (customer: CustomerRecord): void => {
    const siteId = getCurrentSiteId();
    store.dispatch(addCustomer({ siteId, customer }));
};

export const editCustomerInRedux = (customer: Partial<CustomerRecord>): void => {
    const customerUpdates = {
        ...customer,
        siteId: getCurrentSiteId()
    }
    store.dispatch(editCustomer(customerUpdates));
};

export const setCurrentCustomerIdInRedux = (customerId: string): void => {
    store.dispatch(setCurrentCustomerId(customerId))
}

export const selectCurrentCustomerId = (state: RootState) => state.customerData.currentCustomerId;

export const selectCurrentCustomer = createSelector(
    selectCurrentCustomerId,
    store.getState,
    (currentCustomerId, state) => selectCustomerById(state, currentCustomerId));

export const selectMeterReadingsByCustomerId = createSelector(
    selectCurrentCustomerId,
    selectAllMeterReadingsArray,
    (customerId, allMeterReadings) => allMeterReadings?.filter(meterReading =>  meterReading.customerId === customerId)
)
