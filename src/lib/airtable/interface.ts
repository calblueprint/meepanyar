export type TableValues = string | boolean | number | Array<unknown> | Airtable.Attachment;

export type TableRecord =
  | UserRecord
  | SiteRecord
  | TariffPlanRecord
  | CustomerRecord
  | CustomerUpdateRecord
  | MeterReadingRecord
  | PaymentRecord
  | FinancialSummaryRecord;

export type Row = {
  get: (key: string) => TableValues;
  getId: () => string;
};

export interface UserRecord {
  rid: string;
  username: string;
  email: string;
  photo?: Airtable.Attachment[];
  siteIds: string[];
  sites: SiteRecord[];
  password: string;
  name: string;
}

export interface SiteRecord {
  rid: string;
  name: string;
  customerIds: string[];
  customers: CustomerRecord[];
  financialSummaryIds: string[];
  financialSummaries: FinancialSummaryRecord[];
}

export interface TariffPlanRecord {
  rid: string;
  name: string;
  fixedTariff: number;
  tariffByUnit: number;
  minUnits: number;
}

export interface CustomerRecord {
  name: string;
  meterNumber: number;
  tariffPlansId: string[];
  tariffPlans: TariffPlanRecord;
  isactive: boolean;
  hasmeter: boolean;
  outstandingBalance: string;
  meterReadingIds: string[];
  meterReadings: MeterReadingRecord[];
  paymentIds: string[];
  payments: PaymentRecord[];
  customerUpdateIds: string[];
  customerUpdates: CustomerUpdateRecord[];
  totalAmountBilledfromInvoices: number;
  totalAmountPaidfromPayments: number;
}

export interface CustomerUpdateRecord {
  dateUpdated: string;
  customerId: string[];
  explanation: string;
  userId: string[];
}

export interface MeterReadingRecord {
  reading: number;
  amountBilled: number;
  date: string;
  meterNumber: number;
}

export interface PaymentRecord {
  amount: number;
  date: string;
}

export interface FinancialSummaryRecord {
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
