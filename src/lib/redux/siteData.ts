import { store } from './store';
import { setLoadingForSiteData, setCurrSite, saveSiteData } from './siteDataSlice';
import { getAllSites, getCustomersByIds, getMeterReadingsByIds, getPaymentsByIds } from '../../utils/airtable/requests';
import { CustomerRecord, MeterReadingRecord, PaymentRecord } from '../../utils/airtable/interface';

const refreshSiteData = async (user: any): Promise<void> => {
  store.dispatch(setLoadingForSiteData());
  let currentSite = null;
  const sites = await getAllSites();

  for (const site of sites) {
    const customerIds = site.customerIds;
    let customers: CustomerRecord[] = [];

    if (customerIds) {
      customers = await getCustomersByIds(customerIds);

      // Grab payments and meter readings for each customer
      for (const customer of customers) {
        const meterReadings = await getMeterReadingsForCustomer(customer);
        const payments = await getPaymentsForCustomer(customer);
        customer.meterReadings = meterReadings;
        customer.payments = payments;
      }
    }

    site.customers = customers;
  }

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

// Helper function to grab a meter reading for a specific customer
const getMeterReadingsForCustomer = async (customer: CustomerRecord): Promise<MeterReadingRecord[]> => {
  const meterReadingIds = customer.meterReadingIds;
  let meterReadings: MeterReadingRecord[] = [];

  if (meterReadingIds) {
    meterReadings = await getMeterReadingsByIds(meterReadingIds);
  }
  meterReadings.sort((a, b) => (Date.parse(a.date) > Date.parse(b.date)) ? -1 : 1)
  return meterReadings;
};

// Helper function to grab a payment for a specific customer
const getPaymentsForCustomer = async (customer: CustomerRecord): Promise<PaymentRecord[]> => {
  const paymentIds = customer.paymentIds;
  let payments: PaymentRecord[] = [];

  if (paymentIds) {
    payments = await getPaymentsByIds(paymentIds);
  }

  return payments;
};

export { refreshSiteData, setCurrentSite };
