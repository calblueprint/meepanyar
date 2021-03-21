import { CustomerRecord } from '../airtable/interface';
import { addCustomer, setCurrentCustomerId, saveCustomerData } from './customerDataSlice';
import { getCurrentSiteId } from './siteData';
import { store } from './store';

const addCustomerToRedux = (customer: CustomerRecord): void => {
    store.dispatch(addCustomer(customer));
};

const setCurrentCustomer = (customer: CustomerRecord) => {
    const siteId = getCurrentSiteId();
    const id = customer.id;
    store.dispatch(setCurrentCustomerId({ id, siteId }))
}

export { setCurrentCustomer, addCustomerToRedux };