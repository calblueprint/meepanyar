// This file contains the overarching function that pulls data from the backend 
// and places the payload contents into different redux store slices

import { store } from './store';
import { getAllSites } from '../airtable/request';
import { SiteRecord, CustomerRecord, SiteId } from '../airtable/interface';
import { saveSiteData, setLoadingForSiteData } from './siteDataSlice';
import { saveCustomerData } from './customerDataSlice';

const refreshData = async (loadSilently: boolean): Promise<void> => {

    if (!loadSilently) {
        store.dispatch(setLoadingForSiteData());
    }
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

    const siteIdsToCustomers = extractCustomerDataFromSite(sites);

    store.dispatch(saveCustomerData({ siteIdsToCustomers }));
    store.dispatch(saveSiteData(siteData));
};


const extractCustomerDataFromSite = (sites: SiteRecord[]): Record<SiteId, CustomerRecord[]> => {

    const siteIdsToCustomers: Record<SiteId, CustomerRecord[]> = {};
    sites.map((site: SiteRecord) => {
        siteIdsToCustomers[site.id] = site.customers || [];
        // We delete customers here so that there is no duplicate data
        // between the siteDataSlice and customerDataSlice
        delete site.customers;
    })

    return siteIdsToCustomers;
}

export default refreshData;