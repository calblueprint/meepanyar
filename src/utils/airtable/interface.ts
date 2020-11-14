export type TableValues = string | boolean | number | Array<unknown> | Airtable.Attachment;
export type TableRecord =
  | UserRecord
  | CustomerRecord
  | SiteRecord
  | InvoiceRecord
  | PaymentRecord
  | MeterReadingRecord
  | TariffPlanRecord;

export type Row = {
  get: (key: string) => TableValues;
  getId: () => string;
};

interface Record {
  rid: string;
}

export interface UserRecord extends Record {
  username: string;
  name: string;
  email: string;
  password: string;
  photo?: Airtable.Attachment[];
  siteIds: string[];
  sites: SiteRecord[];
}

export interface SiteRecord extends Record {
  name: string;
  customerIds: string[];
  customers: CustomerRecord[];
}

export interface TariffPlanRecord extends Record {
  name: string;
  fixedTariff: number;
  tariffByUnit: number;
  minUnits: number;
}

export interface CustomerRecord extends Record {
  name: string;
  outstandingBalance: string;
  meterNumber: number;
  meterReadingIds: string[];
  meterReadings: MeterReadingRecord[];
  tariffPlansId: string[];
  tariffPlans: TariffPlanRecord[];
  invoiceIds: string[];
  invoices: InvoiceRecord[];
  paymentIds: string[];
  payments: PaymentRecord[];
  isactive: boolean;
  hasmeter: boolean;
}

export interface MeterReadingRecord extends Record {
  date: string;
  reading: number;
  isStartingMeter: boolean;
  isCurrentReading: boolean;
}

export interface InvoiceRecord extends Record {
  amountBilled: number;
  date: string;
}

export interface PaymentRecord extends Record {
  amount: number;
  date: string;
}
