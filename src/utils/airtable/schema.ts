/*
    THIS IS A GENERATED FILE
    Changes might be overwritten in the future, edit with caution!
*/
import {
  TableRecord,
  UserRecord,
  CustomerRecord,
  SiteRecord,
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
  Users: 'Users',
  Sites: 'Sites',
  TariffPlans: 'Tariff Plans',
  Customers: 'Customers',
  MeterReadingsandInvoices: 'Meter Readings and Invoices',
  Payments: 'Payments',
};

export const TableSchemas: Schema = {
  Users: {
    username: `Username`,
    email: `Email`,
    photo: `Photo`,
    siteIds: `Site`,
    password: `Password`,
    name: `Name`,
    invoices: `Invoices`,
    paymentIds: `Payments`,
    meterReadingIds: `Meter Readings and Invoices`,
  },
  Sites: {
    name: `Name`,
    userIds: `Users`,
    customerIds: `Customers`,
  },
  'Tariff Plans': {
    name: `Name`,
    fixedTariff: `Fixed Tariff`,
    tariffByUnit: `Tariff By Unit`,
    minUnits: `Min Units`,
    customerIds: `Customer`,
  },
  Customers: {
    name: `Name`,
    meterNumber: `Meter Number`,
    tariffPlansId: `Tariff Plans`,
    sitesId: `Sites`,
    isactive: `IsActive`,
    hasmeter: `HasMeter`,
    outstandingBalance: `Outstanding Balance`,
    meterReadingIds: `Meter Readings`,
    totalAmountBilledfromInvoices: `Total Amount Billed (from Invoices)`,
    totalAmountPaidfromPayments: `Total Amount Paid (from Payments)`,
    paymentIds: `Payments`,
  },
  'Meter Readings and Invoices': {
    meterId: `Meter ID`,
    reading: `Reading`,
    customerId: `Customer`,
    amountBilled: `Amount Billed`,
    date: `Date`,
    billedByIds: `Billed By`,
  },
  Payments: {
    name: `Name`,
    amount: `Amount`,
    date: `Date`,
    billedToIds: `Billed To`,
    collectedByIds: `Collected By`,
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
    formatLinkedRecords<MeterReadingRecord>(
      Tables.MeterReadingsandInvoices,
      customer.meterReadingIds,
      formatMeterReading,
    ).then((meterReadings) => {
      customer.meterReadings = meterReadings;
    });
  }
  if (customer.tariffPlansId !== undefined) {
    formatLinkedRecords<TariffPlanRecord>(Tables.TariffPlans, customer.tariffPlansId, formatTariffPlan).then(
      (tariffPlans) => {
        customer.tariffPlans = tariffPlans;
      },
    );
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

export function formatPayment(row: Row): PaymentRecord {
  return formatRecord<PaymentRecord>(row, Tables.Payments);
}

export function formatMeterReading(row: Row): MeterReadingRecord {
  return formatRecord<MeterReadingRecord>(row, Tables.MeterReadingsandInvoices);
}
