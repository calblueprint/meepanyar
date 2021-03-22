import { getAllSites } from '../airtable/request';
import { SiteRecord, CustomerRecord, SiteId } from '../airtable/interface';
import { EMPTY_SITE, saveSiteData, setCurrSite, setLoadingForSiteData } from './siteDataSlice';
import { saveCustomerData } from './customerDataSlice';
import { store } from './store';

//  TODO: DON'T KNOW WHERE TO PUT THIS????? Shouldn't be here.
const refreshData = async (): Promise<void> => {
  store.dispatch(setLoadingForSiteData());
  let currentSite = null;

  // Sites authentication is done on backend
  const sites = await getAllSites();

  if (sites.length > 0) {
    currentSite = sites[0];
  }

  const siteData = {
    sites,
    currentSite
  }

  const customerData = extractCustomerDataFromSite(sites);

  store.dispatch(saveCustomerData(customerData));
  store.dispatch(saveSiteData(siteData));
};

const extractCustomerDataFromSite = (sites: SiteRecord[]): Record<SiteId, CustomerRecord[]> => {

  const siteIdsToCustomers: Record<SiteId, CustomerRecord[]> = {};
  sites.map((site: SiteRecord) => {
    siteIdsToCustomers[site.id] = site.customers || [];
    delete site.customers;
  })

  return siteIdsToCustomers;
}

const setCurrentSite = (newSite: any): void => {
  store.dispatch(setCurrSite(newSite));
};

const getCurrentSiteId = (): string => {
  return store.getState().siteData.currentSite.id;
}

export { refreshData, setCurrentSite, getCurrentSiteId };
