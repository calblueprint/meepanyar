/*
    THIS IS A GENERATED FILE
    Changes might be overwritten in the future, edit with caution!
*/
import {
  getCustomerById,
  getSiteById,
  getIncidentById,
  getInventoryUpdateById,
  getInventoryById,
  getUserById,
  getIncidentUpdateById,
  getTariffPlanById,
  getFinancialReportById,
  getCustomerUpdateById,
  getInvoiceById,
  getPaymentById,
  getMeterReadingById
} from './requests';
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
import {
  getAllRecords,
  getRecordById,
  deleteRecord,
} from './airtable';

type TableNames = string &
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

export type NewMap = {
  [k: string]: string;
};

type Column = {
  [column: string]: any;
};

type Schema = {
  [table: string]: Column;
};

export const Tables: NewMap = {
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
    period: 'Period',
    customerId: 'Customer',
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
  const schema = Columns[table];
  return transformRecord(row, schema);
}

export function formatUser(row: Row): UserRecord {
  const user = formatRecord<UserRecord>(row, Tables.Users);
  // const incidentPromises = user.incidentIds.map(async id => await getIncidentById(id));
  // const incidents = await Promise.all(incidentPromises);
  // const sitePromises = user.siteIds.map(async id => await getSiteById(id));
  // const sites = await Promise.all(sitePromises);
  // const customerPromises = user.customerIds.map(async id => await getCustomerById(id));
  // const customers = await Promise.all(customerPromises);
  // return {...user, customers, sites, incidents};
  return user;
}

export async function formatCustomer(row: Row): Promise<CustomerRecord> {
  const customer = formatRecord<CustomerRecord>(row, Tables.Customers);
  customer.haspaid = !!customer.haspaid;
  customer.isactive = !!customer.isactive;
  customer.isbilled = !!customer.isbilled;
  customer.needsReading = !!customer.needsReading;
  const sitePromises = customer.sitesId.map(async id => await getSiteById(id));
  const sites = await Promise.all(sitePromises);
  const customerUpdatePromises = customer.customerUpdateIds.map(async id => await getCustomerUpdateById(id));
  const customerUpdates = await Promise.all(customerUpdatePromises);
  const tariffPlanPromises = customer.tariffPlansId.map(async id => await getTariffPlanById(id));
  const tariffPlans = await Promise.all(tariffPlanPromises);
  const invoicePromises = customer.invoiceIds.map(async id => await getInvoiceById(id));
  const invoices = await Promise.all(invoicePromises);
  const paymentPromises = customer.paymentIds.map(async id => getPaymentById(id));
  const payments = await Promise.all(paymentPromises);
  const meterReadingPromises = customer.meterReadingIds.map(async id => getMeterReadingById(id));
  const meterReadings = await Promise.all(meterReadingPromises);
  return {...customer, customerUpdates, sites, tariffPlans, invoices, payments, meterReadings};
}

export async function formatInvoice(row: Row): Promise<InvoiceRecord> {
  const invoice = formatRecord<InvoiceRecord>(row, Tables.Invoices);
  const promises = invoice.customerId.map(async id => await getCustomerById(id));
  const customer = await Promise.all(promises);
  return {...invoice, customer};
}

export async function formatPayment(row: Row): Promise<PaymentRecord> {
  const payment = formatRecord<PaymentRecord>(row, Tables.Payments);
  const promises = payment.customerId.map(async id => await getCustomerById(id));
  const customer = await Promise.all(promises);
  return {...payment, customer};
}

export async function formatCustomerUpdate(row: Row): Promise<CustomerUpdateRecord> {
  const customerUpdate = formatRecord<CustomerUpdateRecord>(row, Tables.CustomerUpdates);
  const promises = customerUpdate.customerId.map(async id => await getCustomerById(id));
  const customer = await Promise.all(promises);
  return {...customerUpdate, customer};
}

export async function formatMeterReading(row: Row): Promise<MeterReadingRecord> {
  const meterReading = formatRecord<MeterReadingRecord>(row, Tables.MeterReadings);
  const promises = meterReading.customerId.map(async id => await getCustomerById(id));
  const customer = await Promise.all(promises);
  return {...meterReading, customer};
}

export async function formatSite(row: Row): Promise<SiteRecord> {
  const site = formatRecord<SiteRecord>(row, Tables.Sites);
  const incidentPromises = site.incidentIds.map(async id => await getIncidentById(id));
  const incidents = await Promise.all(incidentPromises);
  const customerPromises = site.customerIds.map(async id => await getCustomerById(id));
  const customers = await Promise.all(customerPromises);
  const userPromises = site.userIds.map(async id => await getUserById(id));
  const users = await Promise.all(userPromises);
  const tariffPlanPromises = site.tariffPlanIds.map(async id => await getTariffPlanById(id));
  const tariffPlans = await Promise.all(tariffPlanPromises);
  const inventoryPromises = site.inventoryIds.map(async id => await getInventoryById(id));
  const inventory = await Promise.all(inventoryPromises);
  const inventoryUpdatePromises = site.inventoryUpdateIds.map(async id => await getInventoryUpdateById(id));
  const inventoryUpdates = await Promise.all(inventoryUpdatePromises);
  const financialReportPromises = site.financialReportIds.map(async id => getFinancialReportById(id));
  const financialReports = await Promise.all(financialReportPromises);
  return {...site, incidents, customers, users, tariffPlans, inventory, inventoryUpdates, financialReports};
}

export async function formatTariffPlan(row: Row): Promise<TariffPlanRecord> {
  const tariffPlan = formatRecord<TariffPlanRecord>(row, Tables.TariffPlans);
  const sitePromises = tariffPlan.siteIds.map(async id => await getSiteById(id));
  const customerPromises = tariffPlan.customerIds.map(async id => await getCustomerById(id));
  const sites = await Promise.all(sitePromises);
  const customers = await Promise.all(customerPromises);
  return {...tariffPlan, customers, sites};
}

export async function formatInventory(row: Row): Promise<InventoryRecord> {
  const inventory = formatRecord<InventoryRecord>(row, Tables.Inventory);
  const sitePromises = inventory.siteId.map(async id => await getSiteById(id));
  const site = await Promise.all(sitePromises);
  const inventoryUpdatePromises = inventory.inventoryUpdateIds.map(async id => await getInventoryUpdateById(id));
  const inventoryUpdates = await Promise.all(inventoryUpdatePromises);
  return {...inventory, site, inventoryUpdates};
}

export async function formatInventoryUpdate(row: Row): Promise<InventoryUpdateRecord> {
  const inventoryUpdate = formatRecord<InventoryUpdateRecord>(row, Tables.InventoryUpdates);
  const sitePromises = inventoryUpdate.siteId.map(async id => await getSiteById(id));
  const site = await Promise.all(sitePromises);
  const inventoryItemPromise = inventoryUpdate.inventoryItemId.map(async id => await getInventoryById(id));
  const inventoryItem = await Promise.all(inventoryItemPromise);
  return {...inventoryUpdate, site, inventoryItem};
}

export async function formatIncident(row: Row): Promise<IncidentRecord> {
  const incident = formatRecord<IncidentRecord>(row, Tables.Incidents);
  const sitePromise = incident.siteId.map(async id => await getSiteById(id));
  const site = await Promise.all(sitePromise);
  const userPromise = incident.userId.map(async id => await getUserById(id));
  const user = await Promise.all(userPromise);
  const incidentUpdatePromises = incident.incidentUpdateIds.map(async id => await getIncidentUpdateById(id));
  const incidentUpdates = await Promise.all(incidentUpdatePromises);
  return {...incident, site, user, incidentUpdates};
}

export async function formatIncidentUpdate(row: Row): Promise<IncidentUpdateRecord> {
  const incidentUpdate = formatRecord<IncidentUpdateRecord>(row, Tables.IncidentUpdates);
  const incidentPromise = incidentUpdate.incidentId.map(async id => await getIncidentById(id));
  const incident = await Promise.all(incidentPromise);
  return {...incidentUpdate, incident};
}

export function formatMaintenance(row: Row): MaintenanceRecord {
  return formatRecord<MaintenanceRecord>(row, Tables.Maintenance);
}

export async function formatFinancialReport(row: Row): Promise<FinancialReportRecord> {
  const financialReport = formatRecord<FinancialReportRecord>(row, Tables.FinancialReport);
  const promises = financialReport.sitesId.map(async id => await getSiteById(id));
  const site = await Promise.all(promises);
  // What i want is to set financialReport.site = result from getting request
  // financialReport.site = ;
  return {...financialReport, site};
}

function formatLinkedRecords<T>(table: string, ids: string[], format: (row: Row) => T): Promise<T[]> {
  const promises = ids.map(async id => await getRecordById<T>(table, id, format));
  return Promise.all(promises)
    .then((records) => {
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