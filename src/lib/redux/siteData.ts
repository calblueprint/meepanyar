import { getAllSites } from '../airtable/request';
import { CustomerRecord } from '../airtable/interface';
import { addCustomer, saveSiteData, setCurrSite, setLoadingForSiteData } from './siteDataSlice';
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

const getCurrentSiteId = (): string => {
  return store.getState().siteData.currentSite.id;
}

// TODO: @julianrkung move to customerData
const addCustomerToRedux = (customer: CustomerRecord): void => {
  store.dispatch(addCustomer(customer));
};


export { refreshSiteData, setCurrentSite, addCustomerToRedux, getCurrentSiteId };
