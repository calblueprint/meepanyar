export type TableValues = string | boolean | number | Array<unknown> | Airtable.Attachment;
export type TableRecordType = {
  [key: string]: TableValues;
};
export type TableRecord =
  | UserRecord
  | SiteRecord
  | TariffPlanRecord
  | CustomerRecord
  | MeterReadingRecord
  | PaymentRecord
  | FinancialSummaryRecord;

export type Row = {
  get: (key: string) => TableValues;
  getId: () => string;
};

export interface UserRecord {
  username: string;
  email: string;
  photo?: Airtable.Attachment[];
  siteIds: string[];
  sites: SiteRecord[];
  password: string;
  name: string;
}

export interface SiteRecord {
  name: string;
  customerIds: string[];
  customers: CustomerRecord[];
  financialSummaryIds: string[];
  financialSummaries: FinancialSummaryRecord[];
}

export interface TariffPlanRecord {
  name: string;
  fixedTariff: number;
  tariffByUnit: number;
  minUnits: number;
}

export interface CustomerRecord {
  name: string;
  meterNumber: number;
  tariffPlansId: string[];
  tariffPlans: TariffPlanRecord[];
  isactive: boolean;
  hasmeter: boolean;
  outstandingBalance: string;
  meterReadingIds: string[];
  meterReadings: MeterReadingRecord[];
  paymentIds: string[];
  payments: PaymentRecord[];
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
