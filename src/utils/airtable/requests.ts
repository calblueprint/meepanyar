/* eslint no-restricted-imports: 0 */
/* eslint-disable no-unused-vars */

/*
  THIS IS A GENERATED FILE
  Changes might be overwritten in the future, edit with caution!

  Wrapper functions around functions in airtable.js that interact with Airtable, designed
  to provide basic functionality

  If you're adding a new function: make sure you add a corresponding test (at least 1) for it in request.spec.js

*/

import {
  Tables,
  formatUser,
  formatCustomer,
  formatInvoice,
  formatPayment,
  formatCustomerUpdate,
  formatMeterReading,
  formatSite,
  formatTariffPlan,
  formatInventory,
  formatInventoryUpdate,
  formatIncident,
  formatIncidentUpdate,
  formatMaintenance,
  formatFinancialReport,
} from './schema';
import {
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
} from './interface';
import { getAllRecords, getRecordById, deleteRecord } from './airtable';

/*
 ******* READ RECORDS *******
 */

export const getUserById = async (id: string): Promise<UserRecord> => {
  return getRecordById(Tables.Users, id, formatUser);
};

export const getUsersByIds = async (ids: string[], filterByFormula = '', sort = []): Promise<UserRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Users, formula, sort, formatUser);
};

export const getAllUsers = async (filterByFormula = '', sort = []): Promise<UserRecord[]> => {
  return getAllRecords(Tables.Users, filterByFormula, sort, formatUser);
};

export const getCustomerById = async (id: string): Promise<CustomerRecord> => {
  return getRecordById(Tables.Customers, id, formatCustomer);
};

export const getCustomersByIds = async (ids: string[], filterByFormula = '', sort = []): Promise<CustomerRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Customers, formula, sort, formatCustomer);
};

export const getAllCustomers = async (filterByFormula = '', sort = []): Promise<CustomerRecord[]> => {
  return getAllRecords(Tables.Customers, filterByFormula, sort, formatCustomer);
};

export const getInvoiceById = async (id: string): Promise<InvoiceRecord> => {
  return getRecordById(Tables.Invoices, id, formatInvoice);
};

export const getInvoicesByIds = async (ids: string[], filterByFormula = '', sort = []): Promise<InvoiceRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Invoices, formula, sort, formatInvoice);
};

export const getAllInvoices = async (filterByFormula = '', sort = []): Promise<InvoiceRecord[]> => {
  return getAllRecords(Tables.Invoices, filterByFormula, sort, formatInvoice);
};

export const getPaymentById = async (id: string): Promise<PaymentRecord> => {
  return getRecordById(Tables.Payments, id, formatPayment);
};

export const getPaymentsByIds = async (ids: string[], filterByFormula = '', sort = []): Promise<PaymentRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Payments, formula, sort, formatPayment);
};

export const getAllPayments = async (filterByFormula = '', sort = []): Promise<PaymentRecord[]> => {
  return getAllRecords(Tables.Payments, filterByFormula, sort, formatPayment);
};

export const getCustomerUpdateById = async (id: string): Promise<CustomerUpdateRecord> => {
  return getRecordById(Tables.CustomerUpdates, id, formatCustomerUpdate);
};

export const getCustomerUpdatesByIds = async (
  ids: string[],
  filterByFormula = '',
  sort = [],
): Promise<CustomerUpdateRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.CustomerUpdates, formula, sort, formatCustomerUpdate);
};

export const getAllCustomerUpdates = async (filterByFormula = '', sort = []): Promise<CustomerUpdateRecord[]> => {
  return getAllRecords(Tables.CustomerUpdates, filterByFormula, sort, formatCustomerUpdate);
};

export const getMeterReadingById = async (id: string): Promise<MeterReadingRecord> => {
  return getRecordById(Tables.MeterReadings, id, formatMeterReading);
};

export const getMeterReadingsByIds = async (
  ids: string[],
  filterByFormula = '',
  sort = [],
): Promise<MeterReadingRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.MeterReadings, formula, sort, formatMeterReading);
};

export const getAllMeterReadings = async (filterByFormula = '', sort = []): Promise<MeterReadingRecord[]> => {
  return getAllRecords(Tables.MeterReadings, filterByFormula, sort, formatMeterReading);
};

export const getSiteById = async (id: string): Promise<SiteRecord> => {
  return getRecordById(Tables.Sites, id, formatSite);
};

export const getSitesByIds = async (ids: string[], filterByFormula = '', sort = []): Promise<SiteRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Sites, formula, sort, formatSite);
};

export const getAllSites = async (filterByFormula = '', sort = []): Promise<SiteRecord[]> => {
  return getAllRecords(Tables.Sites, filterByFormula, sort, formatSite);
};

export const getTariffPlanById = async (id: string): Promise<TariffPlanRecord> => {
  return getRecordById(Tables.TariffPlans, id, formatTariffPlan);
};

export const getTariffPlansByIds = async (
  ids: string[],
  filterByFormula = '',
  sort = [],
): Promise<TariffPlanRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.TariffPlans, formula, sort, formatTariffPlan);
};

export const getAllTariffPlans = async (filterByFormula = '', sort = []): Promise<TariffPlanRecord[]> => {
  return getAllRecords(Tables.TariffPlans, filterByFormula, sort, formatTariffPlan);
};

export const getInventoryById = async (id: string): Promise<InventoryRecord> => {
  return getRecordById(Tables.Inventory, id, formatInventory);
};

export const getInventorysByIds = async (
  ids: string[],
  filterByFormula = '',
  sort = [],
): Promise<InventoryRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Inventory, formula, sort, formatInventory);
};

export const getAllInventorys = async (filterByFormula = '', sort = []): Promise<InventoryRecord[]> => {
  return getAllRecords(Tables.Inventory, filterByFormula, sort, formatInventory);
};

export const getInventoryUpdateById = async (id: string): Promise<InventoryUpdateRecord> => {
  return getRecordById(Tables.InventoryUpdates, id, formatInventoryUpdate);
};

export const getInventoryUpdatesByIds = async (
  ids: string[],
  filterByFormula = '',
  sort = [],
): Promise<InventoryUpdateRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.InventoryUpdates, formula, sort, formatInventoryUpdate);
};

export const getAllInventoryUpdates = async (filterByFormula = '', sort = []): Promise<InventoryUpdateRecord[]> => {
  return getAllRecords(Tables.InventoryUpdates, filterByFormula, sort, formatInventoryUpdate);
};

export const getIncidentById = async (id: string): Promise<IncidentRecord> => {
  return getRecordById(Tables.Incidents, id, formatIncident);
};

export const getIncidentsByIds = async (ids: string[], filterByFormula = '', sort = []): Promise<IncidentRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Incidents, formula, sort, formatIncident);
};

export const getAllIncidents = async (filterByFormula = '', sort = []): Promise<IncidentRecord[]> => {
  return getAllRecords(Tables.Incidents, filterByFormula, sort, formatIncident);
};

export const getIncidentUpdateById = async (id: string): Promise<IncidentUpdateRecord> => {
  return getRecordById(Tables.IncidentUpdates, id, formatIncidentUpdate);
};

export const getIncidentUpdatesByIds = async (
  ids: string[],
  filterByFormula = '',
  sort = [],
): Promise<IncidentUpdateRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.IncidentUpdates, formula, sort, formatIncidentUpdate);
};

export const getAllIncidentUpdates = async (filterByFormula = '', sort = []): Promise<IncidentUpdateRecord[]> => {
  return getAllRecords(Tables.IncidentUpdates, filterByFormula, sort, formatIncidentUpdate);
};

export const getMaintenanceById = async (id: string): Promise<MaintenanceRecord> => {
  return getRecordById(Tables.Maintenance, id, formatMaintenance);
};

export const getMaintenancesByIds = async (
  ids: string[],
  filterByFormula = '',
  sort = [],
): Promise<MaintenanceRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Maintenance, formula, sort, formatMaintenance);
};

export const getAllMaintenances = async (filterByFormula = '', sort = []): Promise<MaintenanceRecord[]> => {
  return getAllRecords(Tables.Maintenance, filterByFormula, sort, formatMaintenance);
};

export const getFinancialReportById = async (id: string): Promise<FinancialReportRecord> => {
  return getRecordById(Tables.FinancialReport, id, formatFinancialReport);
};

export const getFinancialReportsByIds = async (
  ids: string[],
  filterByFormula = '',
  sort = [],
): Promise<FinancialReportRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.FinancialReport, formula, sort, formatFinancialReport);
};

export const getAllFinancialReports = async (filterByFormula = '', sort = []): Promise<FinancialReportRecord[]> => {
  return getAllRecords(Tables.FinancialReport, filterByFormula, sort, formatFinancialReport);
};

/*
 ******* DELETE RECORDS *******
 */

export const deleteUser = async (id: string): Promise<void> => {
  return deleteRecord(Tables.Users, id);
};
export const deleteCustomer = async (id: string): Promise<void> => {
  return deleteRecord(Tables.Customers, id);
};
export const deleteInvoice = async (id: string): Promise<void> => {
  return deleteRecord(Tables.Invoices, id);
};
export const deletePayment = async (id: string): Promise<void> => {
  return deleteRecord(Tables.Payments, id);
};
export const deleteCustomerUpdate = async (id: string): Promise<void> => {
  return deleteRecord(Tables.CustomerUpdates, id);
};
export const deleteMeterReading = async (id: string): Promise<void> => {
  return deleteRecord(Tables.MeterReadings, id);
};
export const deleteSite = async (id: string): Promise<void> => {
  return deleteRecord(Tables.Sites, id);
};
export const deleteTariffPlan = async (id: string): Promise<void> => {
  return deleteRecord(Tables.TariffPlans, id);
};
export const deleteInventory = async (id: string): Promise<void> => {
  return deleteRecord(Tables.Inventory, id);
};
export const deleteInventoryUpdate = async (id: string): Promise<void> => {
  return deleteRecord(Tables.InventoryUpdates, id);
};
export const deleteIncident = async (id: string): Promise<void> => {
  return deleteRecord(Tables.Incidents, id);
};
export const deleteIncidentUpdate = async (id: string): Promise<void> => {
  return deleteRecord(Tables.IncidentUpdates, id);
};
export const deleteMaintenance = async (id: string): Promise<void> => {
  return deleteRecord(Tables.Maintenance, id);
};
export const deleteFinancialReport = async (id: string): Promise<void> => {
  return deleteRecord(Tables.FinancialReport, id);
};
