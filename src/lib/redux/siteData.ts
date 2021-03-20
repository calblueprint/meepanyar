import { store } from './store';
import { setLoadingForSiteData, setCurrSite, saveSiteData } from './siteDataSlice';
import { getAllSites } from '../airtable/request';
import { MeterReadingRecord } from '../airtable/interface';

const refreshSiteData = async (): Promise<void> => {
  store.dispatch(setLoadingForSiteData());
  let currentSite = null;

  // Sites authentication is done on backend
  const sites = await getAllSites();

  if (sites.length > 0) {
    currentSite = sites[0];
  }

  for (let i = 0; i < sites.length; i++) {
    const singleSite = sites[i];
    let singleReading = singleSite.meterReadingIds;
    if (singleReading) {
      singleReading.sort((a: MeterReadingRecord, b: MeterReadingRecord) => (Date.parse(a.date) > Date.parse(b.date)) ? -1 : 1);
    }
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

export { refreshSiteData, setCurrentSite };
