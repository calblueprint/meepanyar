import { store } from './store';
import { setLoadingForSiteData, setCurrSite, saveSiteData } from './siteDataSlice';
import { getAllSites } from '../airtable/request';

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

//refreshes the siteData in the background ie sets loading to false
const refreshSiteDataBackground = async (): Promise<void> => {
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

export { refreshSiteData, setCurrentSite, refreshSiteDataBackground };
