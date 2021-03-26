import { CustomerRecord } from '../airtable/interface';
import { addCustomer, setCurrentCustomer } from './customerDataSlice';
import { getCurrentSiteId } from './siteData';
import { store } from './store';

const addCustomerToRedux = (customer: CustomerRecord): void => {
    const siteId = getCurrentSiteId();
    store.dispatch(addCustomer({ siteId, customer }));
};

const editCustomerInRedux = (customer: any): void => {
    store.dispatch(editCustomer(customer));
};

const setCurrentCustomerInRedux = (customer: CustomerRecord): void => {
    store.dispatch(setCurrentCustomer(customer))
}

const getAllCustomersInSite = (): CustomerRecord[] => {
    const siteId = getCurrentSiteId();
    const siteIdsToCustomers = store.getState().customerData.siteIdsToCustomers[siteId] || {};
    return Object.values(siteIdsToCustomers);
}

export { setCurrentCustomerInRedux, addCustomerToRedux, getAllCustomersInSite };