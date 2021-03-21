import { SiteRecord } from '../airtable/interface';
import { addInventory, saveInventoryData } from './inventoryDataSlice';
import { store } from './store';

const refreshInventoryData = async (currentSite: SiteRecord): Promise<void> => {
  if (currentSite) { // TODO @wangannie what to do if site null
    const products = currentSite.products;
    const currentSiteInventory = currentSite.inventory;
    const purchaseRequests = currentSite.purchaseRequests;
    const inventoryUpdates = currentSite.inventoryUpdates;
    const siteId = currentSite.id;
    const inventoryData = {
      siteId,
      products,
      currentSiteInventory,
      purchaseRequests,
      inventoryUpdates
    }
    console.log("in refresh inventory data", inventoryData);
    store.dispatch(saveInventoryData(inventoryData));
  }
};

const addInventoryToRedux = (inventory: any): void => {
  store.dispatch(addInventory(inventory));
};

export { refreshInventoryData, addInventoryToRedux };

