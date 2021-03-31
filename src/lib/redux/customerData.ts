import { CustomerRecord } from '../airtable/interface';
import { addCustomer, setCurrentCustomerId, editCustomer, selectCustomerById } from './customerDataSlice';
import { getCurrentSiteId } from './siteData';
import { RootState, store } from './store';
import { createSelector } from '@reduxjs/toolkit';

export const addCustomerToRedux = (customer: CustomerRecord): void => {
    const siteId = getCurrentSiteId();
    store.dispatch(addCustomer({ siteId, customer }));
};

export const editCustomerInRedux = (customer: any): void => {
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
