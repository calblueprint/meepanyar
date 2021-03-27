import { SiteRecord } from '../airtable/interface';
import { getAllSites } from '../airtable/request';
import { refreshInventoryData } from './inventoryData';
import { addCustomer, editCustomer, saveSiteData, setCurrSite, setCurrCustomer, setLoadingForSiteData } from './siteDataSlice';
import { MeterReadingRecord } from '../airtable/interface';
import { store } from './store';

const refreshSiteData = async (loadSilently: boolean): Promise<void> => {

  //if background is true then dont set loading parameter.
  if (!loadSilently) {
    store.dispatch(setLoadingForSiteData());
  }
  let currentSite = null;

  // Sites authentication is done on backend
  const sites = await getAllSites();

  if (sites.length > 0) {
    currentSite = sites[0];
  }

  // for (let i = 0; i < sites.length; i++) {
  //   const singleSite = sites[i];
  //   if (singleReading) {
  //     singleReading.sort((a: MeterReadingRecord, b: MeterReadingRecord) => (Date.parse(a.date) > Date.parse(b.date)) ? -1 : 1);
  //   }
  // }

  for (let i = 0; i < sites.length; i++) {
    const singleSite = sites[i];
    const customers = singleSite.customers;
    if (customers) {
      for (let j = 0; j < sites.length; j++) {
        let customerMeterReadings = customers.meterReadings;
        if (customerMeterReadings) {
          customerMeterReadings.sort((a: MeterReadingRecord, b: MeterReadingRecord) => (Date.parse(a.date) > Date.parse(b.date)) ? -1 : 1);
        }
      }
    }
  }

  const siteData = {
    sites,
    currentSite,
  };

  // Extract to inventoryData, delete extra fields
  sites.map((site: SiteRecord) => {
    refreshInventoryData(site);
    delete site.inventoryIds;
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
