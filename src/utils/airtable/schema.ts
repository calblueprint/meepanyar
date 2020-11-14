/*
    THIS IS A GENERATED FILE
    Changes might be overwritten in the future, edit with caution!
*/
import {
  TableRecord,
  UserRecord,
  CustomerRecord,
  SiteRecord,
  InvoiceRecord,
  PaymentRecord,
  MeterReadingRecord,
  TariffPlanRecord,
  Row,
} from './interface';
import { getRecordById } from './airtable';

type Map = {
  [key: string]: string;
};

export type Column = {
  [column: string]: string;
};

type Schema = {
  [table: string]: Column;
};

export const Tables: Map = {
  Users: 'Technician',
  Sites: 'Sites',
  TariffPlans: 'Tariff Plans',
  Customers: 'Customers',
  MeterReadings: 'Meter Readings',
  Invoices: 'Invoices',
  Payments: 'Payments',
  FinancialReport: 'Financial Report',
};

export const TableSchemas: Schema = {
  Technician: {
    username: `Username`,
    name: `Name`,
    email: `Email`,
    password: `Password`,
    photo: `Photo`,
    siteIds: `Site`,
    invoiceIds: `Invoices`,
    paymentIds: `Payments`,
  },
  Sites: {
    name: `Name`,
    technicianIds: `Technicians`,
    customerIds: `Customers`,
  },
  'Tariff Plans': {
    name: `Name`,
    fixedTariff: `Fixed Tariff`,
    tariffByUnit: `Tariff By Unit`,
    minUnits: `Min Units`,
    customerIds: `Customer`,
    invoiceIds: `Invoices`,
  },
  Customers: {
    name: `Name`,
    outstandingBalance: `Outstanding Balance`,
    meterNumber: `Meter Number`,
    meterReadingIds: `Meter Readings`,
    tariffPlansId: `Tariff Plans`,
    invoiceIds: `Invoices`,
    paymentIds: `Payments`,
    isactive: `IsActive`,
    hasmeter: `HasMeter`,
    totalAmountBilledfromInvoices: `Total Amount Billed (from Invoices)`,
    totalAmountPaidfromPayments: `Total Amount Paid (from Payments)`,
    sitesId: `Sites`,
  },
  'Meter Readings': {
    meterId: `Meter ID`,
    date: `Date`,
    reading: `Reading`,
    customerId: `Customer`,
    technician: `Technician`,
    invoiceId: `Invoice`,
  },
  Invoices: {
    name: `Name`,
    date: `Date`,
    billedToId: `Billed To`,
    billedByIds: `Billed By`,
    meterReadingsId: `Meter Readings`,
    tariffPlanIds: `Tariff Plan`,
    amountBilled: `Amount Billed`,
    meterReading: `Meter Reading`,
    tariffByUnitfromTariffPlan: `Tariff By Unit (from Tariff Plan)`,
    fixedTarifffromTariffPlan: `Fixed Tariff (from Tariff Plan)`,
  },
  Payments: {
    name: `Name`,
    amount: `Amount`,
    date: `Date`,
    billedToIds: `Billed To`,
    billedByIds: `Billed By`,
  },
  'Financial Report': {
    reportId: `Report ID`,
    notes: `Notes`,
    attachments: `Attachments`,
    status: `Status`,
  },
};

function transformRecord<T extends TableRecord>(row: Row, schema: Column): T {
  const tRecord: any = {};
  Object.keys(schema).forEach((key) => {
    const value = (row.get(schema[key]) as unknown) as T[keyof T];
    if (typeof value !== 'undefined') tRecord[key] = value;
  });
  tRecord.rid = row.getId();
  return tRecord as T;
}

function formatRecord<T extends TableRecord>(row: Row, table: string): T {
  const schema = TableSchemas[table];
  return transformRecord(row, schema);
}

function formatLinkedRecords<T>(table: string, ids: string[], format: (row: Row) => T): Promise<T[]> {
  const promises = ids.map(async (id) => await getRecordById<T>(table, id, format));
  return Promise.all(promises).then((records) => {
    const transformedRecords: T[] = [];
    if (!records || records.length < 1) {
      // No need for this to throw an error, sometimes there're just no values
      return [];
    }
    records.forEach((record: T) => {
      transformedRecords.push(record);
    });
    return transformedRecords;
  });
}

export function formatUser(row: Row): UserRecord {
  const user = formatRecord<UserRecord>(row, Tables.Users);
  if (user.siteIds !== undefined) {
    formatLinkedRecords<SiteRecord>(Tables.Sites, user.siteIds, formatSite).then((sites) => {
      user.sites = sites;
    });
  }
  return user;
}

export function formatSite(row: Row): SiteRecord {
  const site = formatRecord<SiteRecord>(row, Tables.Sites);
  if (site.customerIds !== undefined) {
    formatLinkedRecords<CustomerRecord>(Tables.Customers, site.customerIds, formatCustomer).then((customers) => {
      site.customers = customers;
    });
  }
  return site;
}

export function formatCustomer(row: Row): CustomerRecord {
  const customer = formatRecord<CustomerRecord>(row, Tables.Customers);
  if (customer.meterReadingIds !== undefined) {
    formatLinkedRecords<MeterReadingRecord>(Tables.MeterReadings, customer.meterReadingIds, formatMeterReading).then(
      (meterReadings) => {
        customer.meterReadings = meterReadings;
      },
    );
  }
  if (customer.tariffPlansId !== undefined) {
    formatLinkedRecords<TariffPlanRecord>(Tables.TariffPlans, customer.tariffPlansId, formatTariffPlan).then(
      (tariffPlans) => {
        customer.tariffPlans = tariffPlans;
      },
    );
  }
  if (customer.invoiceIds !== undefined) {
    formatLinkedRecords<InvoiceRecord>(Tables.Invoices, customer.invoiceIds, formatInvoice).then((invoices) => {
      customer.invoices = invoices;
    });
  }
  if (customer.paymentIds !== undefined) {
    formatLinkedRecords<PaymentRecord>(Tables.Payments, customer.paymentIds, formatPayment).then((payments) => {
      customer.payments = payments;
    });
  }
  return customer;
}

export function formatTariffPlan(row: Row): TariffPlanRecord {
  return formatRecord<TariffPlanRecord>(row, Tables.TariffPlans);
}

export function formatInvoice(row: Row): InvoiceRecord {
  return formatRecord<InvoiceRecord>(row, Tables.Invoices);
}

export function formatPayment(row: Row): PaymentRecord {
  return formatRecord<PaymentRecord>(row, Tables.Payments);
}

export function formatMeterReading(row: Row): MeterReadingRecord {
  return formatRecord<MeterReadingRecord>(row, Tables.MeterReadings);
}
