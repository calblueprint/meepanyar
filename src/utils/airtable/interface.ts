export type TableValues = string | boolean | number | Array<unknown> | Attachment;
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

export type Attachment = {
  id: string;
  size?: number;
  url: string;
  type?: string;
  filename: string;
  thumbnails?: {
      small?: {
           url?: string;
           width?: number;
           height?: number;
       },
      large?: {
           url?: string;
           width?: number;
           height?: number;
       }
   }
}

interface Record {
  rid: string;
}

export interface UserRecord extends Record {
  အမည်: string;
  name: string;
  username: string;
  email: string;
  password: string;
	photo?: Attachment[];
	incidentIds: IncidentRecord[];
	siteIds: SiteRecord[];
  customers: CustomerRecord[];
}

export interface CustomerRecord extends Record {
  အမည်: string;
  name: string;
  meterNumber: number;
  tariffPlansId: TariffPlanRecord[];
  customerUpdateIds: CustomerUpdateRecord[];
  sitesId: SiteRecord[];
  isactive: boolean;
  hasmeter: boolean;
  invoiceIds: InvoiceRecord[];
  paymentIds: PaymentRecord[];
	meterReadingIds: MeterReadingRecord[];
	haspaid: boolean;
	isbilled: boolean;
  needsReading: boolean;
}

export interface SiteRecord extends Record {
  name: string
	incidentIds: IncidentRecord[];
	inventoryIds: InventoryRecord[];
	inventoryUpdateIds: InventoryUpdateRecord[];
	tariffPlanIds: TariffPlanRecord[];
	userIds: UserRecord[];
	customerIds: CustomerRecord[];
	currentPeriod: number;
	financialReportIds: FinancialReportRecord[];
	periodStartDate: string;
	periodEndDate: string;
  numNeedsReading: number;
  numCustomersNeedPay: number;
}

export interface InvoiceRecord extends Record {
	amount: number;
	date: string;
  customerId: CustomerRecord[];
}

export interface PaymentRecord extends Record {
	amount: number;
	date: string;
  customerId: CustomerRecord[];
}

export interface CustomerUpdateRecord extends Record {
	explanation: string;
	dateUpdated: string;
  customerId: CustomerRecord[];
}

export interface MeterReadingRecord extends Record {
	date: string;
	reading: number;
	period: number;
  customerId: CustomerRecord[];
}

export interface TariffPlanRecord extends Record {
  name: string;
	fixedTariff: number;
	tariffByUnit: number;
	minUnits: number;
	siteIds: SiteRecord[];
  customerIds: CustomerRecord[];
}

export interface InventoryRecord extends Record {
  name: string;
	quantity: number;
	siteId: SiteRecord[];
	quantityUnit: string;
	inventoryUpdateIds: InventoryUpdateRecord[];
  lastUpdatedDatefromInventoryUpdates: string;
}

export interface InventoryUpdateRecord extends Record {
  quantity: number;
  receiptPhoto: Attachment[];
  inventoryItemId: InventoryRecord[];
  adminApproved: boolean;
  siteId: SiteRecord[];
  amountPaid: number;
  notes: string;
  dateRecorded: string;
}

export interface IncidentRecord extends Record {
  name: string;
  description: string;
  incidentPhotos: Attachment[];
  status: string;
  incidentUpdateIds: IncidentUpdateRecord[];
  isResolved: boolean;
  resolutionDate: string;
  resolutionDescription: string;
  resolutionPhoto: Attachment[];
  dateRecorded: string;
  siteId: SiteRecord[];
  userId: UserRecord[];
  category: string[];
}

export interface IncidentUpdateRecord extends Record {
  description: string;
  photos?: Attachment[];
  dateRecorded: string;
  incidentId: IncidentRecord[];
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
  bankSlip: Attachment[];
  paymentApproved: boolean;
  reportApproved: boolean;
  sitesId: SiteRecord[];
  numTotalCustomers: number;
  totalOutstandingPayments: number;
  numActiveCustomers: number;
  totalExpenses: number;
  numPaidCustomers: number;
  amountCollected: number;
  numNeedsReading: number;
  numCustomersNeedPay: number;
}