import { InventoryRecord, InventoryUpdateRecord, PurchaseRequestRecord, SiteRecord } from '../airtable/interface';
import { getAllProducts, getInventorysByIds, getInventoryUpdatesByIds, getPurchaseRequestsByIds } from '../airtable/request';
import { saveInventoryData, setLoadingForInventoryData } from './inventoryDataSlice';
import { store } from './store';

const refreshInventoryData = async (currentSite: SiteRecord): Promise<void> => {
  store.dispatch(setLoadingForInventoryData());
  if (currentSite) { // TODO @wangannie what to do if site null
    const products = await getAllProducts();

    const currentSiteInventory = await getInventorysByIds(currentSite.inventoryIds);
    
    // TODO @wangannie: look into avoiding .flat, simplifying/eliminating .filter
    const inventoryWithPurchaseRequests = currentSiteInventory.filter((inventory: InventoryRecord) => inventory.purchaseRequestIds);
    let purchaseRequests: PurchaseRequestRecord[] = [];
    await Promise.all(inventoryWithPurchaseRequests.map(async (inventory: InventoryRecord) => 
      getPurchaseRequestsByIds(inventory.purchaseRequestIds)
    )).then(data => purchaseRequests = data as PurchaseRequestRecord[]);
    purchaseRequests = purchaseRequests.flat(1);

      
    const inventoryWithUpdates = currentSiteInventory.filter((inventory: InventoryRecord) => inventory.inventoryUpdateIds);
    let inventoryUpdates: InventoryUpdateRecord[] = [];
    await Promise.all(inventoryWithUpdates.map(async (inventory: InventoryRecord) => 
      getInventoryUpdatesByIds(inventory.inventoryUpdateIds)
    )).then(data => inventoryUpdates = data as InventoryUpdateRecord[]);
    inventoryUpdates = inventoryUpdates.flat(1);

    const inventoryData = {
      products,
      currentSiteInventory,
      purchaseRequests,
      inventoryUpdates
    }
    store.dispatch(saveInventoryData(inventoryData));
  }
};

export { refreshInventoryData };
