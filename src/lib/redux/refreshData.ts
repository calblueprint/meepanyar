// This file contains the overarching function that pulls data from the backend 
// and places the payload contents into different redux store slices

import { SiteRecord } from '../airtable/interface';
import { getAllSites } from '../airtable/request';
import { refreshCustomerData } from './customerData';
import { refreshInventoryData } from './inventoryData';
import { saveSiteData, setLoadingForSiteData } from './siteDataSlice';
import { store } from './store';
import { refreshSiteUsersData } from './userData';

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
    extractUserDataFromSite(sites);

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
    sites.map((site: SiteRecord) => {
        refreshCustomerData(site);
        // We delete customers here so that there is no duplicate data
        // between the siteDataSlice and customerDataSlice
        delete site.customers;
        delete site.payments;
        delete site.meterReadings;
    })
}

const extractUserDataFromSite = (sites: SiteRecord[]) => {
    sites.map((site: SiteRecord) => {
        refreshSiteUsersData(site);
        // We delete users here so that there is no duplicate data
        // between the siteDataSlice and userDataSlice
        delete site.users;
    })
}

export default refreshData;