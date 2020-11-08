export type TableValues = string | boolean | number | Array<unknown> | Airtable.Attachment;
export type TableRecord =
  | UserRecord
  | CustomerRecord
  | SiteRecord
  | InvoiceRecord
  | PaymentRecord
  | CustomerUpdateRecord
  | MeterReadingRecord
  | TariffPlanRecord
  | InventoryRecord
  | InventoryUpdateRecord
  | IncidentRecord
  | IncidentUpdateRecord
  | MaintenanceRecord
  | FinancialReportRecord;

export type Row = {
  get: (key: string) => TableValues;
  getId: () => string;
};

interface Record {
  rid: string;
}

export interface UserRecord extends Record {
  အမည်: string;
  name: string;
  username: string;
  email: string;
  password: string;
  photo?: Airtable.Attachment[];
  incidentIds: string[];
  siteIds: string[];
  sites: SiteRecord[];
  customerIds: string[];
  customers: CustomerRecord[];
}

export interface CustomerRecord extends Record {
  အမည်: string;
  name: string;
  meterNumber: number;
  tariffPlansId: string[];
  tariffPlans: TariffPlanRecord[];
  customerUpdateIds: string[];
  customerUpdates: CustomerUpdateRecord[];
  sitesId: string[];
  isactive: boolean;
  hasmeter: boolean;
  invoiceIds: string[];
  invoices: InvoiceRecord[];
  paymentIds: string[];
  payments: PaymentRecord[];
  meterReadingIds: string[];
  meterReadings: MeterReadingRecord[];
  haspaid: boolean;
  isbilled: boolean;
  needsReading: boolean;
}

export interface SiteRecord extends Record {
  name: string;
  incidentIds: string[];
  incidents: IncidentRecord[];
  inventoryIds: string[];
  inventory: InventoryRecord[];
  tariffPlanIds: string[];
  tariffPlans: TariffPlanRecord[];
  customerIds: string[];
  currentPeriod: number;
  financialReportIds: string[];
  financialReports: FinancialReportRecord[];
  periodStartDate: string;
  periodEndDate: string;
  numNeedsReading: number;
  numCustomersNeedPay: number;
}

export interface InvoiceRecord extends Record {
  amount: number;
  date: string;
  customerId: string[];
}

export interface PaymentRecord extends Record {
  amount: number;
  date: string;
  customerId: string[];
}

export interface CustomerUpdateRecord extends Record {
  explanation: string;
  dateUpdated: string;
  customerId: string[];
}

export interface MeterReadingRecord extends Record {
  date: string;
  reading: number;
  customerId: string[];
}

export interface TariffPlanRecord extends Record {
  name: string;
  fixedTariff: number;
  tariffByUnit: number;
  minUnits: number;
}

export interface InventoryRecord extends Record {
  name: string;
  quantity: number;
  siteId: string[];
  quantityUnit: string;
  inventoryUpdateIds: string[];
  inventoryUpdates: InventoryUpdateRecord[];
  lastUpdatedDatefromInventoryUpdates: string;
}

export interface InventoryUpdateRecord extends Record {
  quantity: number;
  receiptPhoto: Airtable.Attachment[];
  inventoryItemId: string[];
  adminApproved: boolean;
  siteId: string[];
  amountPaid: number;
  notes: string;
  dateRecorded: string;
}

export interface IncidentRecord extends Record {
  name: string;
  description: string;
  incidentPhotos: Airtable.Attachment[];
  status: string;
  incidentUpdateIds: string[];
  incidentUpdates: IncidentUpdateRecord[];
  isResolved: boolean;
  resolutionDate: string;
  resolutionDescription: string;
  resolutionPhoto: Airtable.Attachment[];
  dateRecorded: string;
  siteId: string[];
  userId: string[];
  category: string[];
}

export interface IncidentUpdateRecord extends Record {
  description: string;
  photos?: Airtable.Attachment[];
  dateRecorded: string;
  incidentId: string[];
}

export interface MaintenanceRecord extends Record {
  taskDescription: string;
  frequency: string;
  equipment: string;
}

export interface FinancialReportRecord extends Record {
  name: string;
  electricityUsage: number;
  tariffsCharged: number;
  numBilledCustomers: number;
  totalProfit: number;
  lastUpdated: string;
  period: number;
  bankSlip: Airtable.Attachment[];
  paymentApproved: boolean;
  reportApproved: boolean;
  sitesId: string[];
  numTotalCustomers: number;
  totalOutstandingPayments: number;
  numActiveCustomers: number;
  totalExpenses: number;
  numPaidCustomers: number;
  amountCollected: number;
  numNeedsReading: number;
  numCustomersNeedPay: number;
}
