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
  createRecords,
  updateRecord,
  updateRecords,
  getAllRecords,
  getRecordsByAttribute,
  getRecordById,
  deleteRecord,
} from './airtable';

/*
 ******* CREATE RECORDS *******
 */

export const createUser = async (record) => {
  return createRecord(Tables.Users, record);
};

export const createManyUsers = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Users, subset));
  }
  return Promise.all(createPromises);
};

export const createCustomer = async (record) => {
  return createRecord(Tables.Customers, record);
};

export const createManyCustomers = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Customers, subset));
  }
  return Promise.all(createPromises);
};

export const createInvoice = async (record) => {
  return createRecord(Tables.Invoices, record);
};

export const createManyInvoices = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Invoices, subset));
  }
  return Promise.all(createPromises);
};

export const createPayment = async (record) => {
  return createRecord(Tables.Payments, record);
};

export const createManyPayments = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Payments, subset));
  }
  return Promise.all(createPromises);
};

export const createCustomerUpdate = async (record) => {
  return createRecord(Tables.CustomerUpdates, record);
};

export const createManyCustomerUpdates = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.CustomerUpdates, subset));
  }
  return Promise.all(createPromises);
};

export const createMeterReading = async (record) => {
  return createRecord(Tables.MeterReadings, record);
};

export const createManyMeterReadings = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.MeterReadings, subset));
  }
  return Promise.all(createPromises);
};

export const createSite = async (record) => {
  return createRecord(Tables.Sites, record);
};

export const createManySites = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Sites, subset));
  }
  return Promise.all(createPromises);
};

export const createTariffPlan = async (record) => {
  return createRecord(Tables.TariffPlans, record);
};

export const createManyTariffPlans = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.TariffPlans, subset));
  }
  return Promise.all(createPromises);
};

export const createInventory = async (record) => {
  return createRecord(Tables.Inventory, record);
};

export const createManyInventorys = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Inventory, subset));
  }
  return Promise.all(createPromises);
};

export const createInventoryUpdate = async (record) => {
  return createRecord(Tables.InventoryUpdates, record);
};

export const createManyInventoryUpdates = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.InventoryUpdates, subset));
  }
  return Promise.all(createPromises);
};

export const createIncident = async (record) => {
  return createRecord(Tables.Incidents, record);
};

export const createManyIncidents = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Incidents, subset));
  }
  return Promise.all(createPromises);
};

export const createIncidentUpdate = async (record) => {
  return createRecord(Tables.IncidentUpdates, record);
};

export const createManyIncidentUpdates = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.IncidentUpdates, subset));
  }
  return Promise.all(createPromises);
};

export const createMaintenance = async (record) => {
  return createRecord(Tables.Maintenance, record);
};

export const createManyMaintenances = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Maintenance, subset));
  }
  return Promise.all(createPromises);
};

export const createFinancialReport = async (record) => {
  return createRecord(Tables.FinancialReport, record);
};

export const createManyFinancialReports = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.FinancialReport, subset));
  }
  return Promise.all(createPromises);
};

/*
 ******* READ RECORDS *******
 */

export const getUserById = async (id) => {
  return getRecordById(Tables.Users, id);
};

export const getUsersByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Users, formula, sort);
};

export const getAllUsers = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Users, filterByFormula, sort);
};

export const getCustomerById = async (id) => {
  return getRecordById(Tables.Customers, id);
};

export const getCustomersByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Customers, formula, sort);
};

export const getAllCustomers = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Customers, filterByFormula, sort);
};

export const getInvoiceById = async (id) => {
  return getRecordById(Tables.Invoices, id);
};

export const getInvoicesByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Invoices, formula, sort);
};

export const getAllInvoices = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Invoices, filterByFormula, sort);
};

export const getPaymentById = async (id) => {
  return getRecordById(Tables.Payments, id);
};

export const getPaymentsByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Payments, formula, sort);
};

export const getAllPayments = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Payments, filterByFormula, sort);
};

export const getCustomerUpdateById = async (id) => {
  return getRecordById(Tables.CustomerUpdates, id);
};

export const getCustomerUpdatesByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.CustomerUpdates, formula, sort);
};

export const getAllCustomerUpdates = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.CustomerUpdates, filterByFormula, sort);
};

export const getMeterReadingById = async (id) => {
  return getRecordById(Tables.MeterReadings, id);
};

export const getMeterReadingsByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.MeterReadings, formula, sort);
};

export const getAllMeterReadings = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.MeterReadings, filterByFormula, sort);
};

export const getSiteById = async (id) => {
  return getRecordById(Tables.Sites, id);
};

export const getSitesByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Sites, formula, sort);
};

export const getAllSites = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Sites, filterByFormula, sort);
};

export const getTariffPlanById = async (id) => {
  return getRecordById(Tables.TariffPlans, id);
};

export const getTariffPlansByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.TariffPlans, formula, sort);
};

export const getAllTariffPlans = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.TariffPlans, filterByFormula, sort);
};

export const getInventoryById = async (id) => {
  return getRecordById(Tables.Inventory, id);
};

export const getInventorysByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Inventory, formula, sort);
};

export const getAllInventorys = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Inventory, filterByFormula, sort);
};

export const getInventoryUpdateById = async (id) => {
  return getRecordById(Tables.InventoryUpdates, id);
};

export const getInventoryUpdatesByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.InventoryUpdates, formula, sort);
};

export const getAllInventoryUpdates = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.InventoryUpdates, filterByFormula, sort);
};

export const getIncidentById = async (id) => {
  return getRecordById(Tables.Incidents, id);
};

export const getIncidentsByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Incidents, formula, sort);
};

export const getAllIncidents = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Incidents, filterByFormula, sort);
};

export const getIncidentUpdateById = async (id) => {
  return getRecordById(Tables.IncidentUpdates, id);
};

export const getIncidentUpdatesByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.IncidentUpdates, formula, sort);
};

export const getAllIncidentUpdates = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.IncidentUpdates, filterByFormula, sort);
};

export const getMaintenanceById = async (id) => {
  return getRecordById(Tables.Maintenance, id);
};

export const getMaintenancesByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Maintenance, formula, sort);
};

export const getAllMaintenances = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Maintenance, filterByFormula, sort);
};

export const getFinancialReportById = async (id) => {
  return getRecordById(Tables.FinancialReport, id);
};

export const getFinancialReportsByIds = async ( ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.FinancialReport, formula, sort);
};

export const getAllFinancialReports = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.FinancialReport, filterByFormula, sort);
};

/*
 ******* UPDATE RECORDS *******
 */

export const updateUser = async (id, recordUpdates) => {
  return updateRecord(Tables.Users, id, recordUpdates);
};

export const updateManyUsers = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Users, subset));
  }
  return Promise.all(updatePromises);
};

export const updateCustomer = async (id, recordUpdates) => {
  return updateRecord(Tables.Customers, id, recordUpdates);
};

export const updateManyCustomers = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Customers, subset));
  }
  return Promise.all(updatePromises);
};

export const updateInvoice = async (id, recordUpdates) => {
  return updateRecord(Tables.Invoices, id, recordUpdates);
};

export const updateManyInvoices = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Invoices, subset));
  }
  return Promise.all(updatePromises);
};

export const updatePayment = async (id, recordUpdates) => {
  return updateRecord(Tables.Payments, id, recordUpdates);
};

export const updateManyPayments = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Payments, subset));
  }
  return Promise.all(updatePromises);
};

export const updateCustomerUpdate = async (id, recordUpdates) => {
  return updateRecord(Tables.CustomerUpdates, id, recordUpdates);
};

export const updateManyCustomerUpdates = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.CustomerUpdates, subset));
  }
  return Promise.all(updatePromises);
};

export const updateMeterReading = async (id, recordUpdates) => {
  return updateRecord(Tables.MeterReadings, id, recordUpdates);
};

export const updateManyMeterReadings = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.MeterReadings, subset));
  }
  return Promise.all(updatePromises);
};

export const updateSite = async (id, recordUpdates) => {
  return updateRecord(Tables.Sites, id, recordUpdates);
};

export const updateManySites = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Sites, subset));
  }
  return Promise.all(updatePromises);
};

export const updateTariffPlan = async (id, recordUpdates) => {
  return updateRecord(Tables.TariffPlans, id, recordUpdates);
};

export const updateManyTariffPlans = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.TariffPlans, subset));
  }
  return Promise.all(updatePromises);
};

export const updateInventory = async (id, recordUpdates) => {
  return updateRecord(Tables.Inventory, id, recordUpdates);
};

export const updateManyInventorys = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Inventory, subset));
  }
  return Promise.all(updatePromises);
};

export const updateInventoryUpdate = async (id, recordUpdates) => {
  return updateRecord(Tables.InventoryUpdates, id, recordUpdates);
};

export const updateManyInventoryUpdates = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.InventoryUpdates, subset));
  }
  return Promise.all(updatePromises);
};

export const updateIncident = async (id, recordUpdates) => {
  return updateRecord(Tables.Incidents, id, recordUpdates);
};

export const updateManyIncidents = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Incidents, subset));
  }
  return Promise.all(updatePromises);
};

export const updateIncidentUpdate = async (id, recordUpdates) => {
  return updateRecord(Tables.IncidentUpdates, id, recordUpdates);
};

export const updateManyIncidentUpdates = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.IncidentUpdates, subset));
  }
  return Promise.all(updatePromises);
};

export const updateMaintenance = async (id, recordUpdates) => {
  return updateRecord(Tables.Maintenance, id, recordUpdates);
};

export const updateManyMaintenances = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Maintenance, subset));
  }
  return Promise.all(updatePromises);
};

export const updateFinancialReport = async (id, recordUpdates) => {
  return updateRecord(Tables.FinancialReport, id, recordUpdates);
};

export const updateManyFinancialReports = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.FinancialReport, subset));
  }
  return Promise.all(updatePromises);
};

/*
 ******* DELETE RECORDS *******
 */

export const deleteUser = async (id) => {
  return deleteRecord(Tables.Users, id);
};
export const deleteCustomer = async (id) => {
  return deleteRecord(Tables.Customers, id);
};
export const deleteInvoice = async (id) => {
  return deleteRecord(Tables.Invoices, id);
};
export const deletePayment = async (id) => {
  return deleteRecord(Tables.Payments, id);
};
export const deleteCustomerUpdate = async (id) => {
  return deleteRecord(Tables.CustomerUpdates, id);
};
export const deleteMeterReading = async (id) => {
  return deleteRecord(Tables.MeterReadings, id);
};
export const deleteSite = async (id) => {
  return deleteRecord(Tables.Sites, id);
};
export const deleteTariffPlan = async (id) => {
  return deleteRecord(Tables.TariffPlans, id);
};
export const deleteInventory = async (id) => {
  return deleteRecord(Tables.Inventory, id);
};
export const deleteInventoryUpdate = async (id) => {
  return deleteRecord(Tables.InventoryUpdates, id);
};
export const deleteIncident = async (id) => {
  return deleteRecord(Tables.Incidents, id);
};
export const deleteIncidentUpdate = async (id) => {
  return deleteRecord(Tables.IncidentUpdates, id);
};
export const deleteMaintenance = async (id) => {
  return deleteRecord(Tables.Maintenance, id);
};
export const deleteFinancialReport = async (id) => {
  return deleteRecord(Tables.FinancialReport, id);
};
