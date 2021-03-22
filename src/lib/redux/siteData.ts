import { SiteRecord } from '../airtable/interface';
import { getAllSites } from '../airtable/request';
import { refreshInventoryData } from './inventoryData';
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

  // Extract to inventoryData, delete extra fields
  sites.map((site: SiteRecord) => {
    refreshInventoryData(site);
    delete site.products;
    delete site.inventory;
    delete site.inventoryUpdates;
    delete site.purchaseRequests;
  });

  store.dispatch(saveSiteData(siteData));
};

const setCurrentSite = (newSite: any): void => {
  store.dispatch(setCurrSite(newSite));
};

// TODO: @julianrkung move to customerData
const addCustomerToRedux = (customer: any): void => {
  store.dispatch(addCustomer(customer));
};

export { refreshSiteData, setCurrentSite, addCustomerToRedux };
