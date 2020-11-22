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
  formatSite,
  formatTariffPlan,
  formatCustomer,
  formatMeterReading,
  formatPayment,
  formatFinancialSummary,
} from './schema';
import {
  UserRecord,
  SiteRecord,
  TariffPlanRecord,
  CustomerRecord,
  MeterReadingRecord,
  PaymentRecord,
  FinancialSummaryRecord,
} from './interface';
import { getAllRecords, getRecordById, deleteRecord } from './airtable';

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

export const getMeterReadingById = async (id: string): Promise<MeterReadingRecord> => {
  return getRecordById(Tables.MeterReadingsandInvoices, id, formatMeterReading);
};

export const getMeterReadingsByIds = async (
  ids: string[],
  filterByFormula = '',
  sort = [],
): Promise<MeterReadingRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.MeterReadingsandInvoices, formula, sort, formatMeterReading);
};

export const getAllMeterReadings = async (filterByFormula = '', sort = []): Promise<MeterReadingRecord[]> => {
  return getAllRecords(Tables.MeterReadingsandInvoices, filterByFormula, sort, formatMeterReading);
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

export const getFinancialSummaryById = async (id: string): Promise<FinancialSummaryRecord> => {
  return getRecordById(Tables.FinancialSummaries, id, formatFinancialSummary);
};

export const getFinancialSummariesByIds = async (
  ids: string[],
  filterByFormula = '',
  sort = [],
): Promise<FinancialSummaryRecord[]> => {
  let formula = `OR(${ids.reduce((f, id) => `${f} {ID}='${id}',`, '')} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.FinancialSummaries, formula, sort, formatFinancialSummary);
};

export const getAllFinancialSummaries = async (filterByFormula = '', sort = []): Promise<FinancialSummaryRecord[]> => {
  return getAllRecords(Tables.FinancialSummaries, filterByFormula, sort, formatFinancialSummary);
};

/*
 ******* DELETE RECORDS *******
 */

export const deleteUser = async (id: string): Promise<void> => {
  return deleteRecord(Tables.Users, id);
};
export const deleteSite = async (id: string): Promise<void> => {
  return deleteRecord(Tables.Sites, id);
};
export const deleteTariffPlan = async (id: string): Promise<void> => {
  return deleteRecord(Tables.TariffPlans, id);
};
export const deleteCustomer = async (id: string): Promise<void> => {
  return deleteRecord(Tables.Customers, id);
};
export const deleteMeterReading = async (id: string): Promise<void> => {
  return deleteRecord(Tables.MeterReadingsandInvoices, id);
};
export const deletePayment = async (id: string): Promise<void> => {
  return deleteRecord(Tables.Payments, id);
};
export const deleteFinancialSummary = async (id: string): Promise<void> => {
  return deleteRecord(Tables.FinancialSummaries, id);
};
