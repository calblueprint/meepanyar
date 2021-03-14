import { getAllSites } from '../airtable/request';
import { addCustomer, editCustomer, saveSiteData, setCurrSite, setCurrCustomer, setLoadingForSiteData } from './siteDataSlice';
import { store } from './store';

const refreshSiteData = async (): Promise<void> => {
  store.dispatch(setLoadingForSiteData());
  let currentSite = null;

  // Sites authentication is done on backend
  const sites = await getAllSites();

  if (sites.length > 0) {
    currentSite = sites[0];
  }

  const siteData = {
    sites,
    currentSite,
  };

  store.dispatch(saveSiteData(siteData));
};

const setCurrentSite = (newSite: any): void => {
  store.dispatch(setCurrSite(newSite));
};

const setCurrentCustomer = (newCustomer: any): void => {
  store.dispatch(setCurrCustomer(newCustomer));
}

// TODO: @julianrkung move to customerData
const addCustomerToRedux = (customer: any): void => {
  store.dispatch(addCustomer(customer));
};

const editCustomerInRedux = (customer: any): void => {
  store.dispatch(editCustomer(customer));
};

export { refreshSiteData, setCurrentSite, setCurrentCustomer, addCustomerToRedux, editCustomerInRedux };
