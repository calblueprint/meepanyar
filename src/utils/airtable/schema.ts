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
  CustomerUpdateRecord,
  MeterReadingRecord,
  TariffPlanRecord,
  InventoryRecord,
  InventoryUpdateRecord,
  IncidentRecord,
  IncidentUpdateRecord,
  MaintenanceRecord,
  FinancialReportRecord,
  Row,
} from './interface';
import { getRecordById } from './airtable';

type Map = {
  [key: string]: string;
};

type Column = {
  [column: string]: string;
};

type Schema = {
  [table: string]: Column;
};

export const Tables: Map = {
  Users: 'Users',
  Customers: 'Customers',
  Invoices: 'Invoices',
  Payments: 'Payments',
  CustomerUpdates: 'Customer Updates',
  MeterReadings: 'Meter Readings',
  Sites: 'Sites',
  TariffPlans: 'Tariff Plans',
  Inventory: 'Inventory',
  InventoryUpdates: 'Inventory Updates',
  Incidents: 'Incidents',
  IncidentUpdates: 'Incident Updates',
  Maintenance: 'Maintenance',
  FinancialReport: 'Financial Report',
};

export const TableSchemas: Schema = {
  Users: {
    အမည်: 'အမည်',
    email: 'Email',
    photo: 'Photo',
    incidentIds: 'Incidents',
    siteIds: 'Site',
    password: 'Password',
    name: 'Name',
    username: 'Username',
    customerIds: 'Customers',
  },
  Customers: {
    အမည်: 'အမည်',
    name: 'Name',
    meterNumber: 'Meter Number',
    tariffPlansId: 'Tariff Plans',
    customerUpdateIds: 'Customer Updates',
    sitesId: 'Sites',
    isactive: 'IsActive',
    hasmeter: 'HasMeter',
    invoiceIds: 'Invoices',
    paymentIds: 'Payments',
    meterReadingIds: 'Meter Readings',
    haspaid: 'HasPaid',
    isbilled: 'IsBilled',
    needsReading: 'Needs Reading',
  },
  Invoices: {
    amount: 'Amount',
    date: 'Date',
    customerId: 'Customer',
  },
  Payments: {
    amount: 'Amount',
    date: 'Date',
    customerId: 'Customer',
  },
  'Customer Updates': {
    explanation: 'Explanation',
    dateUpdated: 'Date Updated',
    customerId: 'Customer',
  },
  'Meter Readings': {
    date: 'Date',
    reading: 'Reading',
    customerId: 'Customer',
  },
  Sites: {
    name: 'Name',
    incidentIds: 'Incidents',
    inventoryIds: 'Inventory',
    tariffPlanIds: 'Tariff Plans',
    userIds: 'Users',
    customerIds: 'Customers',
    currentPeriod: 'Current Period',
    financialReportIds: 'Financial Report',
    periodStartDate: 'Period Start Date',
    periodEndDate: 'Period End Date',
    numNeedsReading: 'Num Needs Reading',
    numCustomersNeedPay: 'Num Customers Need Pay',
  },
  'Tariff Plans': {
    name: 'Name',
    fixedTariff: 'Fixed Tariff',
    tariffByUnit: 'Tariff By Unit',
    minUnits: 'Min Units',
  },
  Inventory: {
    name: 'Name',
    quantity: 'Quantity',
    siteId: 'Site',
    quantityUnit: 'Quantity Unit',
    inventoryUpdateIds: 'Inventory Updates',
    lastUpdatedDatefromInventoryUpdates: 'Last Updated Date(from Inventory Updates)',
  },
  'Inventory Updates': {
    quantity: 'Quantity',
    receiptPhoto: 'Receipt Photo',
    inventoryItemId: 'Inventory Item',
    adminApproved: 'Admin Approved',
    siteId: 'Site',
    amountPaid: 'Amount Paid',
    notes: 'Notes',
    dateRecorded: 'Date Recorded',
  },
  Incidents: {
    description: 'Description',
    incidentPhotos: 'Incident Photos',
    status: 'Status',
    incidentUpdateIds: 'Incident Updates',
    isResolved: 'Is Resolved',
    resolutionDate: 'Resolution Date',
    resolutionDescription: 'Resolution Description',
    resolutionPhoto: 'Resolution Photo',
    dateRecorded: 'Date Recorded',
    siteId: 'Site',
    userId: 'User',
    category: 'Category',
    name: 'Name',
  },
  'Incident Updates': {
    description: 'Description',
    photos: 'Photos',
    dateRecorded: 'Date Recorded',
    incidentId: 'Incident',
  },
  Maintenance: {
    taskDescription: 'Task Description',
    frequency: 'Frequency',
    equipment: 'Equipment',
  },
  'Financial Report': {
    name: 'Name',
    electricityUsage: 'Electricity Usage',
    tariffsCharged: 'Tariffs Charged',
    numBilledCustomers: 'Num Billed Customers',
    totalProfit: 'Total Profit',
    lastUpdated: 'Last Updated',
    period: 'Period',
    bankSlip: 'Bank Slip',
    paymentApproved: 'Payment Approved',
    reportApproved: 'Report Approved',
    sitesId: 'Sites',
    numTotalCustomers: 'Num Total Customers',
    totalOutstandingPayments: 'Total Outstanding Payments',
    numActiveCustomers: 'Num Active Customers',
    totalExpenses: 'Total Expenses',
    numPaidCustomers: 'Num Paid Customers',
    amountCollected: 'Amount Collected',
    numNeedsReading: 'Num Needs Reading',
    numCustomersNeedPay: 'Num Customers Need Pay',
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
  if (user.customerIds !== undefined) {
    formatLinkedRecords<CustomerRecord>(Tables.Customers, user.customerIds, formatCustomer).then((customers) => {
      user.customers = customers;
    });
  }
  return user;
}

export function formatCustomer(row: Row): CustomerRecord {
  const customer = formatRecord<CustomerRecord>(row, Tables.Customers);
  customer.haspaid = !!customer.haspaid;
  customer.isactive = !!customer.isactive;
  customer.isbilled = !!customer.isbilled;
  customer.needsReading = !!customer.needsReading;
  if (customer.customerUpdateIds !== undefined) {
    formatLinkedRecords<CustomerUpdateRecord>(
      Tables.CustomerUpdates,
      customer.customerUpdateIds,
      formatCustomerUpdate,
    ).then((customerUpdates) => {
      customer.customerUpdates = customerUpdates;
    });
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
  if (customer.meterReadingIds !== undefined) {
    formatLinkedRecords<MeterReadingRecord>(Tables.MeterReadings, customer.meterReadingIds, formatMeterReading).then(
      (meterReadings) => {
        customer.meterReadings = meterReadings;
      },
    );
  }
  return customer;
}

export function formatInvoice(row: Row): InvoiceRecord {
  return formatRecord<InvoiceRecord>(row, Tables.Invoices);
}

export function formatPayment(row: Row): PaymentRecord {
  return formatRecord<PaymentRecord>(row, Tables.Payments);
}

export function formatCustomerUpdate(row: Row): CustomerUpdateRecord {
  return formatRecord<CustomerUpdateRecord>(row, Tables.CustomerUpdates);
}

export function formatMeterReading(row: Row): MeterReadingRecord {
  return formatRecord<MeterReadingRecord>(row, Tables.MeterReadings);
}

export function formatSite(row: Row): SiteRecord {
  const site = formatRecord<SiteRecord>(row, Tables.Sites);
  if (site.incidentIds !== undefined) {
    formatLinkedRecords<IncidentRecord>(Tables.Incidents, site.incidentIds, formatIncident).then((incidents) => {
      site.incidents = incidents;
    });
  }
  if (site.tariffPlanIds !== undefined) {
    formatLinkedRecords<TariffPlanRecord>(Tables.TariffPlans, site.tariffPlanIds, formatTariffPlan).then(
      (tariffPlans) => {
        site.tariffPlans = tariffPlans;
      },
    );
  }
  if (site.inventoryIds !== undefined) {
    formatLinkedRecords<InventoryRecord>(Tables.Inventory, site.inventoryIds, formatInventory).then((inventory) => {
      site.inventory = inventory;
    });
  }
  if (site.financialReportIds !== undefined) {
    formatLinkedRecords<FinancialReportRecord>(
      Tables.FinancialReport,
      site.financialReportIds,
      formatFinancialReport,
    ).then((financialReports) => {
      site.financialReports = financialReports;
    });
  }
  return site;
}

export function formatTariffPlan(row: Row): TariffPlanRecord {
  return formatRecord<TariffPlanRecord>(row, Tables.TariffPlans);
}

export function formatInventory(row: Row): InventoryRecord {
  const inventory = formatRecord<InventoryRecord>(row, Tables.Inventory);
  if (inventory.inventoryUpdateIds !== undefined) {
    formatLinkedRecords<InventoryUpdateRecord>(
      Tables.InventoryUpdates,
      inventory.inventoryUpdateIds,
      formatInventoryUpdate,
    ).then((inventoryUpdates) => {
      inventory.inventoryUpdates = inventoryUpdates;
    });
  }
  return inventory;
}

export function formatInventoryUpdate(row: Row): InventoryUpdateRecord {
  return formatRecord<InventoryUpdateRecord>(row, Tables.InventoryUpdates);
}

export function formatIncident(row: Row): IncidentRecord {
  const incident = formatRecord<IncidentRecord>(row, Tables.Incidents);
  if (incident.incidentUpdateIds !== undefined) {
    formatLinkedRecords<IncidentUpdateRecord>(
      Tables.IncidentUpdates,
      incident.incidentUpdateIds,
      formatIncidentUpdate,
    ).then((incidentUpdates) => {
      incident.incidentUpdates = incidentUpdates;
    });
  }
  return incident;
}

export function formatIncidentUpdate(row: Row): IncidentUpdateRecord {
  return formatRecord<IncidentUpdateRecord>(row, Tables.IncidentUpdates);
}

export function formatMaintenance(row: Row): MaintenanceRecord {
  return formatRecord<MaintenanceRecord>(row, Tables.Maintenance);
}

export function formatFinancialReport(row: Row): FinancialReportRecord {
  return formatRecord<FinancialReportRecord>(row, Tables.FinancialReport);
}
