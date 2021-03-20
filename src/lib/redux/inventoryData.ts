import { SiteRecord } from '../airtable/interface';
import { addInventory, saveInventoryData, setLoadingForInventoryData } from './inventoryDataSlice';
import { store } from './store';

const refreshInventoryData = async (currentSite: SiteRecord): Promise<void> => {
  store.dispatch(setLoadingForInventoryData());
  if (currentSite) { // TODO @wangannie what to do if site null
    const products = currentSite.products;
    const currentSiteInventory = currentSite.inventory;
    const purchaseRequests = currentSite.purchaseRequests;
    const inventoryUpdates = currentSite.inventoryUpdates;

    const inventoryData = {
      products,
      currentSiteInventory,
      purchaseRequests,
      inventoryUpdates
    }
    store.dispatch(saveInventoryData(inventoryData));
  }
};

const addInventoryToRedux = (inventory: any): void => {
  store.dispatch(addInventory(inventory));
};

export { refreshInventoryData, addInventoryToRedux };

