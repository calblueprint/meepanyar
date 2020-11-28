import { store } from './store';
import { setLoadingForSiteData, setCurrSite, saveSiteData } from './siteDataSlice';
import { getAllSites } from '../../utils/airtable/requests';

const refreshSiteData = async (user: any): Promise<void> => {
  store.dispatch(setLoadingForSiteData());
  const siteIds: string[] = user.fields.Site;
  let currentSite = null;
  const sites = await getAllSites();
  console.log(sites);

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

export { refreshSiteData };
