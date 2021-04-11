import { PurchaseRequestStatus } from "../redux/inventoryDataSlice";

export type TableValues = string | boolean | number | Array<unknown> | Airtable.Attachment;

export type TableRecord =
  | UserRecord
  | SiteRecord
  | TariffPlanRecord
  | CustomerRecord
  | CustomerUpdateRecord
  | MeterReadingRecord
  | PaymentRecord
  | FinancialSummaryRecord
  | PurchaseRequestRecord
  | InventoryRecord
  | InventoryUpdateRecord;

export type Row = {
  get: (key: string) => TableValues;
  getId: () => string;
};

export interface UserRecord {
  id: string;
  username: string;
  admin: boolean;
  email?: string;
  photo?: Airtable.Attachment[];
  siteIds?: string[];
  sites?: SiteRecord[];
  password?: string;
  name?: string;
}

export interface SiteRecord {
  id: string;
  name: string;
  customerIds: string[];
  financialSummaryIds: string[];
  // These are extracted to other slices or entities and deleted from SiteRecord
  financialSummaries?: FinancialSummaryRecord[];
  tariffPlans?: TariffPlanRecord[];
  inventoryIds?: string[];
  products?: ProductRecord[];
  inventory?: InventoryRecord[];
  purchaseRequests?: PurchaseRequestRecord[];
  inventoryUpdates?: InventoryUpdateRecord[];
  customers?: CustomerRecord[];
  payments?: PaymentRecord[];
  meterReadings?: MeterReadingRecord[];
  users?: UserRecord[];
}

export interface TariffPlanRecord {
  id: string;
  name: string;
  fixedTariff: number;
  tariffByUnit: number;
  freeUnits: number;
}

export interface CustomerRecord {
  id: string;
  name: string;
  meterNumber: number;
  tariffPlanId: string;
  isactive: boolean;
  hasmeter: boolean;
  outstandingBalance: string;
  meterReadingIds: string[];
  paymentIds: string[];
  customerUpdateIds: string[];
  customerUpdates: CustomerUpdateRecord[];
  totalAmountBilledfromInvoices: number;
  totalAmountPaidfromPayments: number;
  startingMeterReading: number;
}

export interface CustomerUpdateRecord {
  id: string;
  dateUpdated: string;
  customerId: string;
  explanation: string;
  userId: string;
}

export interface MeterReadingRecord {
  id: string;
  reading: number;
  amountBilled: number;
  date: string;
  meterNumber: number;
  customerId: string;
}

export interface PaymentRecord {
  id: string;
  amount: number;
  date: string;
  billedToId: string;
  collectedById: string;
}

export interface FinancialSummaryRecord {
  id: string;
  name: string;
  totalCustomers: number;
  totalCustomersBilled: number;
  totalCustomersPaid: number;
  totalUsage: number;
  totalAmountBilled: number;
  totalAmountCollected: number;
  totalAmountSpent: number;
  totalProfit: number;
  period: string;
  bankSlip?: Airtable.Attachment[];
  isapproved: boolean;
  lastUpdated: string;
  issubmitted: boolean;
}

export interface PurchaseRequestRecord {
  id: string;
  notes?: string;
  status: PurchaseRequestStatus;
  requesterId: string;
  reviewerId?: string;
  createdAt: string;
  reviewedAt?: string;
  amountPurchased: number;
  amountSpent: number;
  receipt?: Airtable.Attachment[];
  inventoryId: string;
}


export interface InventoryRecord {
  id: string;
  siteId: string;
  currentQuantity: number;
  productId: string;
  purchaseRequestIds?: string[];
  inventoryUpdateIds?: string[];
  periodStartQuantity: number;
}

export interface InventoryUpdateRecord {
  id: string;
  userId: string;
  previousQuantity: number;
  updatedQuantity: number;
  inventoryId: string;
  createdAt: string;
}

export interface ProductRecord {
  id: string;
  unit: string;
  name: string;
  inventoryIds?: string[];
}

export type SiteId = string;
export type CustomerId = string;
