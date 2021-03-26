import { InventoryRecord } from "../airtable/interface";

// TODO @wangannie replace with robust id generation
export const generateOfflineInventoryId = (): string => {
    return (Math.floor(Math.random() * 1000)).toString();
}

// Calculate when an inventory record was last updated
export const getInventoryLastUpdated = (inventory: InventoryRecord) => {
    return "00/00/00 00:00pm"; // TODO @wangannie: replace with real calculation
}