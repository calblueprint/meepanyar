import { InventoryRecord, PurchaseRequestRecord, SiteRecord } from '../airtable/interface';
import { addInventory, addPurchaseRequest, saveInventoryData } from './inventoryDataSlice';
import { store } from './store';

const refreshInventoryData = (site: SiteRecord) : void => {
  if (site) { // TODO @wangannie what to do if site null
    const {products, inventory, purchaseRequests, inventoryUpdates } = site;
    const siteId = site.id;
    const inventoryData = {
      siteId,
      products,
      inventory,
      purchaseRequests,
      inventoryUpdates
    }
    store.dispatch(saveInventoryData(inventoryData));
  }
};

const addInventoryToRedux = (inventory: InventoryRecord): void => {
  store.dispatch(addInventory(inventory));
};

const addPurchaseRequestToRedux = (purchaseRequest: PurchaseRequestRecord, siteId: string): void => {
  const purchaseRequestData = {
    ...purchaseRequest,
    siteId: siteId
  }
  store.dispatch(addPurchaseRequest(purchaseRequestData));
}

export { refreshInventoryData, addInventoryToRedux, addPurchaseRequestToRedux };

