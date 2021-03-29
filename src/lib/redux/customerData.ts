import { CustomerRecord } from '../airtable/interface';
import { addCustomer, setCurrentCustomerId, editCustomer, EMPTY_CUSTOMER } from './customerDataSlice';
import { getCurrentSiteId } from './siteData';
import { store } from './store';

const addCustomerToRedux = (customer: CustomerRecord): void => {
    const siteId = getCurrentSiteId();
    store.dispatch(addCustomer({ siteId, customer }));
};

const editCustomerInRedux = (customer: any): void => {
    store.dispatch(editCustomer(customer));
};

const setCurrentCustomerIdInRedux = (customerId: string): void => {
    store.dispatch(setCurrentCustomerId(customerId))
}

const getCurrentCustomer = (): CustomerRecord | undefined => {
    // TODO: When changing to entity adapter, we can speed this up / use a Selector instead
    const customers = getAllCustomersInSite();
    const currentCustomerId = store.getState().customerData.currentCustomerId;
    return customers.find(customer => customer.id === currentCustomerId);
}

const getAllCustomersInSite = (): CustomerRecord[] => {
    const siteId = getCurrentSiteId();
    const siteIdsToCustomers = store.getState().customerData.siteIdsToCustomers[siteId] || {};
    return Object.values(siteIdsToCustomers);
}

export { setCurrentCustomerIdInRedux, addCustomerToRedux, getAllCustomersInSite, editCustomerInRedux, getCurrentCustomer };