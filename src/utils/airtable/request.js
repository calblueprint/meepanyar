/* eslint no-restricted-imports: 0 */
/* eslint-disable no-unused-vars */

/*
  THIS IS A GENERATED FILE
  Changes might be overwritten in the future, edit with caution!

  Wrapper functions around functions in airtable.js that interact with Airtable, designed
  to provide basic functionality

  If you're adding a new function: make sure you add a corresponding test (at least 1) for it in request.spec.js

*/

import { Tables, Columns } from './schema';
import {
  createRecord,
  updateRecord,
  getAllRecords,
  getRecordsByAttribute,
  getRecordById,
  deleteRecord
} from './airtable';

  /*
 ******* CREATE RECORDS *******
 */

export const createUsers = async record => { 
    return createRecord(Tables.Users, record)
};

export const createCustomers = async record => { 
    return createRecord(Tables.Customers, record)
};

export const createInvoices = async record => { 
    return createRecord(Tables.Invoices, record)
};

export const createPayments = async record => { 
    return createRecord(Tables.Payments, record)
};

export const createCustomerUpdates = async record => { 
    return createRecord(Tables.CustomerUpdates, record)
};

export const createMeterReadings = async record => { 
    return createRecord(Tables.MeterReadings, record)
};

export const createSites = async record => { 
    return createRecord(Tables.Sites, record)
};

export const createTariffPlans = async record => { 
    return createRecord(Tables.TariffPlans, record)
};

export const createInventory = async record => { 
    return createRecord(Tables.Inventory, record)
};

export const createInventoryUpdates = async record => { 
    return createRecord(Tables.InventoryUpdates, record)
};

export const createIncidents = async record => { 
    return createRecord(Tables.Incidents, record)
};

export const createIncidentUpdates = async record => { 
    return createRecord(Tables.IncidentUpdates, record)
};

export const createMaintenance = async record => { 
    return createRecord(Tables.Maintenance, record)
};

export const createFinancialReport = async record => { 
    return createRecord(Tables.FinancialReport, record)
};

  /*
 ******* READ RECORDS *******
 */

export const getUsersById = async id => { 
  return getRecordById(Tables.Users, id);
};

export const getUsersByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.Users, formula)
}

export const getAllUsers = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.Users, filterByFormula, sort);
};

export const getCustomersById = async id => { 
  return getRecordById(Tables.Customers, id);
};

export const getCustomersByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.Customers, formula)
}

export const getAllCustomers = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.Customers, filterByFormula, sort);
};

export const getInvoicesById = async id => { 
  return getRecordById(Tables.Invoices, id);
};

export const getInvoicesByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.Invoices, formula)
}

export const getAllInvoices = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.Invoices, filterByFormula, sort);
};

export const getPaymentsById = async id => { 
  return getRecordById(Tables.Payments, id);
};

export const getPaymentsByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.Payments, formula)
}

export const getAllPayments = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.Payments, filterByFormula, sort);
};

export const getCustomerUpdatesById = async id => { 
  return getRecordById(Tables.CustomerUpdates, id);
};

export const getCustomerUpdatesByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.CustomerUpdates, formula)
}

export const getAllCustomerUpdates = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.CustomerUpdates, filterByFormula, sort);
};

export const getMeterReadingsById = async id => { 
  return getRecordById(Tables.MeterReadings, id);
};

export const getMeterReadingsByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.MeterReadings, formula)
}

export const getAllMeterReadings = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.MeterReadings, filterByFormula, sort);
};

export const getSitesById = async id => { 
  return getRecordById(Tables.Sites, id);
};

export const getSitesByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.Sites, formula)
}

export const getAllSites = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.Sites, filterByFormula, sort);
};

export const getTariffPlansById = async id => { 
  return getRecordById(Tables.TariffPlans, id);
};

export const getTariffPlansByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.TariffPlans, formula)
}

export const getAllTariffPlans = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.TariffPlans, filterByFormula, sort);
};

export const getInventoryById = async id => { 
  return getRecordById(Tables.Inventory, id);
};

export const getInventorysByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.Inventory, formula)
}

export const getAllInventorys = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.Inventory, filterByFormula, sort);
};

export const getInventoryUpdatesById = async id => { 
  return getRecordById(Tables.InventoryUpdates, id);
};

export const getInventoryUpdatesByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.InventoryUpdates, formula)
}

export const getAllInventoryUpdates = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.InventoryUpdates, filterByFormula, sort);
};

export const getIncidentsById = async id => { 
  return getRecordById(Tables.Incidents, id);
};

export const getIncidentsByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.Incidents, formula)
}

export const getAllIncidents = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.Incidents, filterByFormula, sort);
};

export const getIncidentUpdatesById = async id => { 
  return getRecordById(Tables.IncidentUpdates, id);
};

export const getIncidentUpdatesByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.IncidentUpdates, formula)
}

export const getAllIncidentUpdates = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.IncidentUpdates, filterByFormula, sort);
};

export const getMaintenanceById = async id => { 
  return getRecordById(Tables.Maintenance, id);
};

export const getMaintenancesByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.Maintenance, formula)
}

export const getAllMaintenances = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.Maintenance, filterByFormula, sort);
};

export const getFinancialReportById = async id => { 
  return getRecordById(Tables.FinancialReport, id);
};

export const getFinancialReportsByIds = async ids => {
  const formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  return getAllRecords(Tables.FinancialReport, formula)
}

export const getAllFinancialReports = async (filterByFormula = '', sort = []) => { 
  return getAllRecords(Tables.FinancialReport, filterByFormula, sort);
};

  /*
 ******* UPDATE RECORDS *******
 */

export const updateUsers = async (id, recordUpdates) => { 
  return updateRecord(Tables.Users, id, recordUpdates);
};

export const updateCustomers = async (id, recordUpdates) => { 
  return updateRecord(Tables.Customers, id, recordUpdates);
};

export const updateInvoices = async (id, recordUpdates) => { 
  return updateRecord(Tables.Invoices, id, recordUpdates);
};

export const updatePayments = async (id, recordUpdates) => { 
  return updateRecord(Tables.Payments, id, recordUpdates);
};

export const updateCustomerUpdates = async (id, recordUpdates) => { 
  return updateRecord(Tables.CustomerUpdates, id, recordUpdates);
};

export const updateMeterReadings = async (id, recordUpdates) => { 
  return updateRecord(Tables.MeterReadings, id, recordUpdates);
};

export const updateSites = async (id, recordUpdates) => { 
  return updateRecord(Tables.Sites, id, recordUpdates);
};

export const updateTariffPlans = async (id, recordUpdates) => { 
  return updateRecord(Tables.TariffPlans, id, recordUpdates);
};

export const updateInventory = async (id, recordUpdates) => { 
  return updateRecord(Tables.Inventory, id, recordUpdates);
};

export const updateInventoryUpdates = async (id, recordUpdates) => { 
  return updateRecord(Tables.InventoryUpdates, id, recordUpdates);
};

export const updateIncidents = async (id, recordUpdates) => { 
  return updateRecord(Tables.Incidents, id, recordUpdates);
};

export const updateIncidentUpdates = async (id, recordUpdates) => { 
  return updateRecord(Tables.IncidentUpdates, id, recordUpdates);
};

export const updateMaintenance = async (id, recordUpdates) => { 
  return updateRecord(Tables.Maintenance, id, recordUpdates);
};

export const updateFinancialReport = async (id, recordUpdates) => { 
  return updateRecord(Tables.FinancialReport, id, recordUpdates);
};

  /*
 ******* DELETE RECORDS *******
 */

export const deleteUsers = async id => { 
    return deleteRecord(Tables.Users, id);
};
export const deleteCustomers = async id => { 
    return deleteRecord(Tables.Customers, id);
};
export const deleteInvoices = async id => { 
    return deleteRecord(Tables.Invoices, id);
};
export const deletePayments = async id => { 
    return deleteRecord(Tables.Payments, id);
};
export const deleteCustomerUpdates = async id => { 
    return deleteRecord(Tables.CustomerUpdates, id);
};
export const deleteMeterReadings = async id => { 
    return deleteRecord(Tables.MeterReadings, id);
};
export const deleteSites = async id => { 
    return deleteRecord(Tables.Sites, id);
};
export const deleteTariffPlans = async id => { 
    return deleteRecord(Tables.TariffPlans, id);
};
export const deleteInventory = async id => { 
    return deleteRecord(Tables.Inventory, id);
};
export const deleteInventoryUpdates = async id => { 
    return deleteRecord(Tables.InventoryUpdates, id);
};
export const deleteIncidents = async id => { 
    return deleteRecord(Tables.Incidents, id);
};
export const deleteIncidentUpdates = async id => { 
    return deleteRecord(Tables.IncidentUpdates, id);
};
export const deleteMaintenance = async id => { 
    return deleteRecord(Tables.Maintenance, id);
};
export const deleteFinancialReport = async id => { 
    return deleteRecord(Tables.FinancialReport, id);
};