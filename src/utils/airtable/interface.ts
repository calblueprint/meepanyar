export type TableValues = string | boolean | number | Array<unknown> | Airtable.Attachment;
export type TableRecordType = {
  [key: string]: TableValues;
};
export type TableRecord =
  | UserRecord
  | CustomerRecord
  | SiteRecord
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
  email: string;
  photo?: Airtable.Attachment[];
  password: string;
  name: string;
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

export interface MeterReadingRecord extends Record {
  date: string;
  reading: number;
  amountBilled: number;
}

export interface PaymentRecord extends Record {
  amount: number;
  date: string;
}
