// This file contains the overarching function that pulls data from the backend 
// and places the payload contents into different redux store slices

import { store } from './store';
import { getAllSites } from '../airtable/request';
import { SiteRecord, CustomerRecord, SiteId } from '../airtable/interface';
import { saveSiteData, setLoadingForSiteData } from './siteDataSlice';
import { saveCustomerData } from './customerDataSlice';
import { refreshInventoryData } from './inventoryData'

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

    extractCustomerDataFromSite(sites);
    extractInventoryDataFromSite(sites);

    store.dispatch(saveSiteData(siteData));
};

const extractInventoryDataFromSite = (sites: SiteRecord[]) => {
    // Extract to inventoryData, delete extra fields
    sites.map((site: SiteRecord) => {
        refreshInventoryData(site);
        delete site.inventoryIds;
        delete site.products;
        delete site.inventory;
        delete site.inventoryUpdates;
        delete site.purchaseRequests;
    });
}

const extractCustomerDataFromSite = (sites: SiteRecord[]) => {

    const siteIdsToCustomers: Record<SiteId, CustomerRecord[]> = {};
    sites.map((site: SiteRecord) => {
        siteIdsToCustomers[site.id] = site.customers || [];
        // We delete customers here so that there is no duplicate data
        // between the siteDataSlice and customerDataSlice
        delete site.customers;
    })

    store.dispatch(saveCustomerData({ siteIdsToCustomers }))
}

export default refreshData;