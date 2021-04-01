import { InventoryRecord } from "../airtable/interface";

// Calculate when an inventory record was last updated
export const getInventoryLastUpdated = (inventory: InventoryRecord) => {
    return "00/00/00 00:00pm"; // TODO @wangannie: replace with real calculation
}