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
  TableValues,
} from './interface';

type Tables = string &
  (
    | 'Users'
    | 'Customers'
    | 'Invoices'
    | 'Payments'
    | 'Customer Updates'
    | 'Meter Readings'
    | 'Sites'
    | 'Tariff Plans'
    | 'Inventory'
    | 'Inventory Updates'
    | 'Incidents'
    | 'Incident Updates'
    | 'Maintenance'
    | 'Financial Report'
  );

export type Map<T> = {
  [k: string]: T;
};

type Column = {
  [column: string]: any;
};

type Schema = {
  [table: string]: Column;
};

type NewSchema<T> = {
  [key in keyof T]: string;
};

export const Tables: Map<Tables> = {
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

export const OldColumns: Schema = {
  Users: {
    အမည်: { name: `အမည်`, type: `text` },
    email: { name: `Email`, type: `text` },
    photo: { name: `Photo`, type: `multipleAttachment` },
    incidentIds: { name: `Incidents`, type: `foreignKey-many` },
    siteIds: { name: `Site`, type: `foreignKey-many` },
    password: { name: `Password`, type: `text` },
    name: { name: `Name`, type: `text` },
    username: { name: `Username`, type: `text` },
    customers: { name: `Customers`, type: `lookup` },
  },
  Customers: {
    အမည်: { name: `အမည်`, type: `text` },
    name: { name: `Name`, type: `text` },
    meterNumber: { name: `Meter Number`, type: `number` },
    tariffPlansId: { name: `Tariff Plans`, type: `foreignKey-one` },
    customerUpdateIds: { name: `Customer Updates`, type: `foreignKey-many` },
    sitesId: { name: `Sites`, type: `foreignKey-one` },
    isactive: { name: `IsActive`, type: `checkbox` },
    hasmeter: { name: `HasMeter`, type: `checkbox` },
    invoiceIds: { name: `Invoices`, type: `foreignKey-many` },
    paymentIds: { name: `Payments`, type: `foreignKey-many` },
    outstandingPayment: { name: `Outstanding Payment`, type: `formula` },
    meterReadingIds: { name: `Meter Readings`, type: `foreignKey-many` },
    startingDate: { name: `Starting Date`, type: `date` },
    amountfromInvoices: { name: `Amount (from Invoices)`, type: `lookup` },
    amountfromPayments: { name: `Amount (from Payments)`, type: `lookup` },
    currentPeriodfromSites: { name: `Current Period (from Sites)`, type: `lookup` },
    haspaid: { name: `HasPaid`, type: `formula` },
    latestMeterReadingDate: { name: `Latest Meter Reading Date`, type: `rollup` },
    latestPaymentDate: { name: `Latest Payment Date`, type: `rollup` },
    latestInvoiceDate: { name: `Latest Invoice Date`, type: `rollup` },
    periodStartDate: { name: `Period Start Date`, type: `lookup` },
    periodEndDate: { name: `Period End Date`, type: `lookup` },
    isbilled: { name: `IsBilled`, type: `formula` },
    previousMeterReadingDate: { name: `Previous Meter Reading Date`, type: `rollup` },
    latestMeterReading: { name: `Latest Meter Reading`, type: `lookup` },
    previousMeterReading: { name: `Previous Meter Reading`, type: `lookup` },
    electricityUsage: { name: `Electricity Usage`, type: `formula` },
    needsReading: { name: `Needs Reading`, type: `formula` },
  },
  Invoices: {
    name: { name: `Name`, type: `formula` },
    amount: { name: `Amount`, type: `number` },
    date: { name: `Date`, type: `date` },
    period: { name: `Period`, type: `number` },
    customerId: { name: `Customer`, type: `foreignKey-one` },
    currentPeriodfromSitesfromCustomers: { name: `Current Period (from Sites) (from Customers)`, type: `lookup` },
    isCurrentPeriod: { name: `Is Current Period`, type: `formula` },
  },
  Payments: {
    name: { name: `Name`, type: `formula` },
    amount: { name: `Amount`, type: `number` },
    period: { name: `Period`, type: `number` },
    date: { name: `Date`, type: `date` },
    customerId: { name: `Customer`, type: `foreignKey-one` },
    isCurrentPeriod: { name: `Is Current Period`, type: `formula` },
    currentPeriodfromSitesfromCustomers: { name: `Current Period (from Sites) (from Customers)`, type: `lookup` },
  },
  'Customer Updates': {
    updateId: { name: `Update Id`, type: `autoNumber` },
    explanation: { name: `Explanation`, type: `multilineText` },
    dateUpdated: { name: `Date Updated`, type: `date` },
    customerId: { name: `Customer`, type: `foreignKey-one` },
  },
  'Meter Readings': {
    name: { name: `Name`, type: `autoNumber` },
    date: { name: `Date`, type: `date` },
    reading: { name: `Reading`, type: `number` },
    period: { name: `Period`, type: `number` },
    customerId: { name: `Customer`, type: `foreignKey-one` },
    latestMeterReadingDate: { name: `Latest Meter Reading Date`, type: `lookup` },
    isLatestMeterReading: { name: `Is Latest Meter Reading`, type: `formula` },
    isOldMeterReading: { name: `Is Old Meter Reading`, type: `formula` },
    previousMeterReadingDate: { name: `Previous Meter Reading Date`, type: `lookup` },
    isPreviousMeterReading: { name: `Is Previous Meter Reading`, type: `formula` },
  },
  Sites: {
    name: { name: `Name`, type: `text` },
    incidentIds: { name: `Incidents`, type: `foreignKey-many` },
    inventoryIds: { name: `Inventory`, type: `foreignKey-many` },
    inventoryUpdateIds: { name: `Inventory Updates`, type: `foreignKey-many` },
    tariffPlanIds: { name: `Tariff Plans`, type: `foreignKey-many` },
    userIds: { name: `Users`, type: `foreignKey-many` },
    customerIds: { name: `Customers`, type: `foreignKey-many` },
    currentPeriod: { name: `Current Period`, type: `number` },
    financialReportIds: { name: `Financial Report`, type: `foreignKey-many` },
    totalNumCustomers: { name: `Total Num Customers`, type: `count` },
    totalOutstandingPayments: { name: `Total Outstanding Payments`, type: `rollup` },
    numActiveCustomers: { name: `Num Active Customers`, type: `count` },
    periodStartDate: { name: `Period Start Date`, type: `date` },
    periodEndDate: { name: `Period End Date`, type: `date` },
    expenses: { name: `Expenses`, type: `rollup` },
    numPaidCustomers: { name: `Num Paid Customers`, type: `rollup` },
    amountCollected: { name: `Amount Collected`, type: `rollup` },
    numBilledCustomers: { name: `Num Billed Customers`, type: `rollup` },
    totalElectricityUsage: { name: `Total Electricity Usage`, type: `rollup` },
    totalTariffsCharged: { name: `Total Tariffs Charged`, type: `rollup` },
    numNeedsReading: { name: `Num Needs Reading`, type: `rollup` },
    numCustomersNeedPay: { name: `Num Customers Need Pay`, type: `formula` },
  },
  'Tariff Plans': {
    name: { name: `Name`, type: `text` },
    fixedTariff: { name: `Fixed Tariff`, type: `number` },
    tariffByUnit: { name: `Tariff By Unit`, type: `number` },
    minUnits: { name: `Min Units`, type: `number` },
    siteIds: { name: `Site`, type: `foreignKey-many` },
    customerIds: { name: `Customer`, type: `foreignKey-many` },
  },
  Inventory: {
    name: { name: `Name`, type: `text` },
    quantity: { name: `Quantity`, type: `number` },
    siteId: { name: `Site`, type: `foreignKey-one` },
    quantityUnit: { name: `Quantity Unit`, type: `multilineText` },
    inventoryUpdateIds: { name: `Inventory Updates`, type: `foreignKey-many` },
    lastUpdatedDatefromInventoryUpdates: { name: `Last Updated Date(from Inventory Updates)`, type: `rollup` },
  },
  'Inventory Updates': {
    name: { name: `Name`, type: `text` },
    quantity: { name: `Quantity`, type: `number` },
    receiptPhoto: { name: `Receipt Photo`, type: `multipleAttachment` },
    inventoryItemId: { name: `Inventory Item`, type: `foreignKey-one` },
    adminApproved: { name: `Admin Approved`, type: `checkbox` },
    siteId: { name: `Site`, type: `foreignKey-one` },
    amountPaid: { name: `Amount Paid`, type: `number` },
    notes: { name: `Notes`, type: `multilineText` },
    dateRecorded: { name: `Date Recorded`, type: `date` },
    isInCurrentPeriod: { name: `Is In Current Period`, type: `formula` },
    periodStartDate: { name: `Period Start Date`, type: `lookup` },
    periodEndDate: { name: `Period End Date`, type: `lookup` },
  },
  Incidents: {
    incidentId: { name: `Incident Id`, type: `autoNumber` },
    description: { name: `Description`, type: `multilineText` },
    incidentPhotos: { name: `Incident Photos`, type: `multipleAttachment` },
    status: { name: `Status`, type: `select` },
    incidentUpdateIds: { name: `Incident Updates`, type: `foreignKey-many` },
    isResolved: { name: `Is Resolved`, type: `checkbox` },
    resolutionDate: { name: `Resolution Date`, type: `date` },
    resolutionDescription: { name: `Resolution Description`, type: `multilineText` },
    resolutionPhoto: { name: `Resolution Photo`, type: `multipleAttachment` },
    dateRecorded: { name: `Date Recorded`, type: `date` },
    siteId: { name: `Site`, type: `foreignKey-one` },
    userId: { name: `User`, type: `foreignKey-one` },
    category: { name: `Category`, type: `multiSelect` },
    name: { name: `Name`, type: `text` },
  },
  'Incident Updates': {
    updateId: { name: `Update Id`, type: `autoNumber` },
    description: { name: `Description`, type: `multilineText` },
    photos: { name: `Photos`, type: `multipleAttachment` },
    dateRecorded: { name: `Date Recorded`, type: `date` },
    incidentId: { name: `Incident`, type: `foreignKey-one` },
  },
  Maintenance: {
    taskDescription: { name: `Task Description`, type: `multilineText` },
    frequency: { name: `Frequency`, type: `select` },
    equipment: { name: `Equipment`, type: `select` },
  },
  'Financial Report': {
    name: { name: `Name`, type: `text` },
    electricityUsage: { name: `Electricity Usage`, type: `lookup` },
    tariffsCharged: { name: `Tariffs Charged`, type: `lookup` },
    numBilledCustomers: { name: `Num Billed Customers`, type: `lookup` },
    totalProfit: { name: `Total Profit`, type: `formula` },
    lastUpdated: { name: `Last Updated`, type: `date` },
    period: { name: `Period`, type: `lookup` },
    bankSlip: { name: `Bank Slip`, type: `multipleAttachment` },
    paymentApproved: { name: `Payment Approved`, type: `checkbox` },
    reportApproved: { name: `Report Approved`, type: `checkbox` },
    sitesId: { name: `Sites`, type: `foreignKey-one` },
    numTotalCustomers: { name: `Num Total Customers`, type: `lookup` },
    totalOutstandingPayments: { name: `Total Outstanding Payments`, type: `lookup` },
    numActiveCustomers: { name: `Num Active Customers`, type: `lookup` },
    totalExpenses: { name: `Total Expenses`, type: `lookup` },
    numPaidCustomers: { name: `Num Paid Customers`, type: `lookup` },
    amountCollected: { name: `Amount Collected`, type: `lookup` },
    numNeedsReading: { name: `Num Needs Reading`, type: `lookup` },
    numCustomersNeedPay: { name: `Num Customers Need Pay`, type: `lookup` },
  },
};

export const Columns: Schema = {
  Users: {
    အမည်: 'အမည်',
    email: 'Email',
    photo: 'Photo',
    incidentIds: 'Incidents',
    siteIds: 'Site',
    password: 'Password',
    name: 'Name',
    username: 'Username',
    customers: 'Customers',
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
    outstandingPayment: 'Outstanding Payment',
    meterReadingIds: 'Meter Readings',
    startingDate: 'Starting Date',
    amountfromInvoices: 'Amount (from Invoices)',
    amountfromPayments: 'Amount (from Payments)',
    currentPeriodfromSites: 'Current Period (from Sites)',
    haspaid: 'HasPaid',
    latestMeterReadingDate: 'Latest Meter Reading Date',
    latestPaymentDate: 'Latest Payment Date',
    latestInvoiceDate: 'Latest Invoice Date',
    periodStartDate: 'Period Start Date',
    periodEndDate: 'Period End Date',
    isbilled: 'IsBilled',
    previousMeterReadingDate: 'Previous Meter Reading Date',
    latestMeterReading: 'Latest Meter Reading',
    previousMeterReading: 'Previous Meter Reading',
    electricityUsage: 'Electricity Usage',
    needsReading: 'Needs Reading',
  },
  Invoices: {
    name: 'Name',
    amount: 'Amount',
    date: 'Date',
    period: 'Period',
    customerId: 'Customer',
    currentPeriodfromSitesfromCustomers: 'Current Period (from Sites) (from Customers)',
    isCurrentPeriod: 'Is Current Period',
  },
  Payments: {
    name: 'Name',
    amount: 'Amount',
    period: 'Period',
    date: 'Date',
    customerId: 'Customer',
    isCurrentPeriod: 'Is Current Period',
    currentPeriodfromSitesfromCustomers: 'Current Period (from Sites) (from Customers)',
  },
  'Customer Updates': {
    updateId: 'Update Id',
    explanation: 'Explanation',
    dateUpdated: 'Date Updated',
    customerId: 'Customer',
  },
  'Meter Readings': {
    name: 'Name',
    date: 'Date',
    reading: 'Reading',
    period: 'Period',
    customerId: 'Customer',
    latestMeterReadingDate: 'Latest Meter Reading Date',
    isLatestMeterReading: 'Is Latest Meter Reading',
    isOldMeterReading: 'Is Old Meter Reading',
    previousMeterReadingDate: 'Previous Meter Reading Date',
    isPreviousMeterReading: 'Is Previous Meter Reading',
  },
  Sites: {
    name: 'Name',
    incidentIds: 'Incidents',
    inventoryIds: 'Inventory',
    inventoryUpdateIds: 'Inventory Updates',
    tariffPlanIds: 'Tariff Plans',
    userIds: 'Users',
    customerIds: 'Customers',
    currentPeriod: 'Current Period',
    financialReportIds: 'Financial Report',
    totalNumCustomers: 'Total Num Customers',
    totalOutstandingPayments: 'Total Outstanding Payments',
    numActiveCustomers: 'Num Active Customers',
    periodStartDate: 'Period Start Date',
    periodEndDate: 'Period End Date',
    expenses: 'Expenses',
    numPaidCustomers: 'Num Paid Customers',
    amountCollected: 'Amount Collected',
    numBilledCustomers: 'Num Billed Customers',
    totalElectricityUsage: 'Total Electricity Usage',
    totalTariffsCharged: 'Total Tariffs Charged',
    numNeedsReading: 'Num Needs Reading',
    numCustomersNeedPay: 'Num Customers Need Pay',
  },
  'Tariff Plans': {
    name: 'Name',
    fixedTariff: 'Fixed Tariff',
    tariffByUnit: 'Tariff By Unit',
    minUnits: 'Min Units',
    siteIds: 'Site',
    customerIds: 'Customer',
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
    name: 'Name',
    quantity: 'Quantity',
    receiptPhoto: 'Receipt Photo',
    inventoryItemId: 'Inventory Item',
    adminApproved: 'Admin Approved',
    siteId: 'Site',
    amountPaid: 'Amount Paid',
    notes: 'Notes',
    dateRecorded: 'Date Recorded',
    isInCurrentPeriod: 'Is In Current Period',
    periodStartDate: 'Period Start Date',
    periodEndDate: 'Period End Date',
  },
  Incidents: {
    incidentId: 'Incident Id',
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
    updateId: 'Update Id',
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

const UserSchema: NewSchema<UserRecord> = {
  rid: 'rid',
  အမည်: 'အမည်',
  name: 'name',
  username: 'username',
  email: 'email',
  password: 'password',
  photo: 'photo',
  incidentIds: 'incidentIds',
  siteIds: 'siteIds',
  customers: 'customers',
};

const CustomerSchema: NewSchema<CustomerRecord> = {
  rid: 'rid',
  အမည်: 'အမည်',
  name: 'name',
  meterNumber: 'meterNumber',
  tariffPlansId: 'tariffPlansId',
  customerUpdateIds: 'customerUpdateIds',
  sitesId: 'sitesId',
  isactive: 'isactive',
  hasmeter: 'hasmeter',
  invoiceIds: 'invoiceIds',
  paymentIds: 'paymentIds',
  meterReadingIds: 'meterReadingIds',
  haspaid: 'haspaid',
  isbilled: 'isbilled',
  needsReading: 'needsReading',
};

function transformRecord<T extends TableRecord>(row: Row, schema: any): T {
  const tRecord: any = {};
  Object.keys(schema).forEach((key) => {
    const k = key as keyof T;
    const value = (row.get(schema[k]) as unknown) as T[keyof T];
    if (typeof value !== 'undefined') tRecord[key] = value;
  });
  tRecord.rid = row.getId();
  return tRecord as T;
}

function formatRecord<T extends TableRecord>(row: Row, table: string): T {
  const schema = Columns[table];
  return transformRecord(row, schema);
}

export function formatUser(row: Row): UserRecord {
  const user = formatRecord<UserRecord>(row, Tables['Users']);
  return user;
}

export function formatCustomer(row: Row): CustomerRecord {
  const customer = formatRecord<CustomerRecord>(row, Tables['Customers']);
  customer.haspaid = !!customer.haspaid;
  customer.isactive = !!customer.isactive;
  customer.isbilled = !!customer.isbilled;
  customer.needsReading = !!customer.needsReading;
  return customer;
}

export function formatInvoice(row: Row): InvoiceRecord {
  return formatRecord<InvoiceRecord>(row, Tables['Invoices']);
}

export function formatPayment(row: Row): PaymentRecord {
  return formatRecord<PaymentRecord>(row, Tables['Payments']);
}

export function formatCustomerUpdate(row: Row): CustomerUpdateRecord {
  return formatRecord<CustomerUpdateRecord>(row, Tables['CustomerUpdates']);
}

export function formatMeterReading(row: Row): MeterReadingRecord {
  return formatRecord<MeterReadingRecord>(row, Tables['MeterReadings']);
}

export function formatSite(row: Row): SiteRecord {
  return formatRecord<SiteRecord>(row, Tables['Sites']);
}

export function formatTariffPlan(row: Row): TariffPlanRecord {
  return formatRecord<TariffPlanRecord>(row, Tables['TariffPlans']);
}

export function formatInventory(row: Row): InventoryRecord {
  return formatRecord<InventoryRecord>(row, Tables['Inventory']);
}

export function formatInventoryUpdate(row: Row): InventoryUpdateRecord {
  return formatRecord<InventoryUpdateRecord>(row, Tables['InventoryUpdates']);
}

export function formatIncident(row: Row): IncidentRecord {
  return formatRecord<IncidentRecord>(row, Tables['Incidents']);
}

export function formatIncidentUpdate(row: Row): IncidentUpdateRecord {
  return formatRecord<IncidentUpdateRecord>(row, Tables['IncidentUpdates']);
}

export function formatMaintenance(row: Row): MaintenanceRecord {
  return formatRecord<MaintenanceRecord>(row, Tables['Maintenance']);
}

export function formatFinancialReport(row: Row): FinancialReportRecord {
  return formatRecord<FinancialReportRecord>(row, Tables['FinancialReport']);
}

//   export function formatPOC(row: Row): ContactRecord {
// 	const poc = formatRecord<ContactRecord>(row, Tables.POC);
// 	poc.image = typeof poc.imageRef[0].thumbnails != 'undefined' ? poc.imageRef[0].thumbnails.large.url : '';
// 	return poc;
//   }
