import { CustomerRecord, CustomerId } from '../airtable/interface';
import { addCustomer, setCurrentCustomerId, EMPTY_CUSTOMER } from './customerDataSlice';
import { getCurrentSiteId } from './siteData';
import { store } from './store';

const addCustomerToRedux = (customer: CustomerRecord): void => {
    store.dispatch(addCustomer(customer));
};

const setCurrentCustomer = (customer: CustomerRecord): void => {
    const siteId = getCurrentSiteId();
    const id = customer.id;
    store.dispatch(setCurrentCustomerId({ id, siteId }))
}

const getCurrentCustomerId = (): CustomerId => {
    return store.getState().customerData.currentCustomerId;
}

const getCurrentCustomer = (): CustomerRecord => {
    const siteId = getCurrentSiteId();
    const currentCustomerId = getCurrentCustomerId();
    const siteIdsToCustomers = store.getState().customerData.siteIdsToCustomers;
    const siteAndCustomerExists = siteIdsToCustomers.hasOwnProperty(siteId) && siteIdsToCustomers[siteId].hasOwnProperty(currentCustomerId);

    return siteAndCustomerExists ? siteIdsToCustomers[siteId][currentCustomerId] : EMPTY_CUSTOMER;
}

const getAllCustomersInSite = (): CustomerRecord[] => {
    const siteId = getCurrentSiteId();
    const siteIdsToCustomers = store.getState().customerData.siteIdsToCustomers[siteId] || {};
    return Object.values(siteIdsToCustomers);
}

export { setCurrentCustomer, addCustomerToRedux };