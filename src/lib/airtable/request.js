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
import { addToOfflineCustomer } from '../utils/customerUtils';

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

// NONGENERATED: We use a special, non-schema-generated createCustomer 
// that hits a special endpoint because we require additional logic to 
// handle offline functionality
export const createCustomer = async (customer) => {
  try {
    const resp = await fetch('http://127.0.0.1:4000/customers/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })

    console.log("Customer created!");
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
}

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

// NONGENERATED: Create a meter reading for a customer
export const createMeterReadingsandInvoice = async (meterReading, customer) => {
  // If customer does not exist, we want to search the requests objectStore
  // to add the current meter reading to the customer request being POST'ed
  if (!customer.rid) {
    addToOfflineCustomer(customer, 'meterReadings', meterReading)
  } else {
    // Customer has an rid so it is in the airtable.
    // Make a standard request to create a meter reading / invoice.
    try {
      meterReading.customerId = customer.rid;
      const resp = await fetch('http://127.0.0.1:4000/meter-readings-and-invoices/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(meterReading)
      })
      console.log('Response for meter reading: ', resp);
    } catch (err) {
      console.log('Error with create meter reading request: ', err);
    }
  }
}

export const createManyMeterReadingsandInvoices = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.MeterReadingsandInvoices, subset));
  }
  return Promise.all(createPromises);
};

// NONGENERATED: Create a payment for a customer
export const createPayment = async (payment, customer) => {
  // If customer does not exist, we want to search the requests objectStore
  // to add the current meter reading to the customer request being POST'ed
  if (!customer.rid) {
    addToOfflineCustomer(customer, 'payments', payment);
  } else {
    // Customer has an rid so it is in the airtable.
    // Make a standard request to create a payment.
    try {
      payment.customerId = customer.rid;
      const resp = await fetch('http://127.0.0.1:4000/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payment)
      })
      console.log('Response for payment: ', resp);
    } catch (err) {
      console.log('Error with create payment request: ', err)
    }
  }
}

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

export const createFinancialSummarie = async (record) => {
  return createRecord(Tables.FinancialSummaries, record);
};

export const createManyFinancialSummaries = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.FinancialSummaries, subset));
  }
  return Promise.all(createPromises);
};

/*
 ******* READ RECORDS *******
 */

export const getUserById = async (id) => {
  return getRecordById(Tables.Users, id);
};

export const getUsersByIds = async (ids, filterByFormula = '', sort = []
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

export const getSiteById = async (id) => {
  return getRecordById(Tables.Sites, id);
};

export const getSitesByIds = async (ids, filterByFormula = '', sort = []
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

export const getTariffPlansByIds = async (ids, filterByFormula = '', sort = []
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

export const getCustomerById = async (id) => {
  return getRecordById(Tables.Customers, id);
};

export const getCustomersByIds = async (ids, filterByFormula = '', sort = []
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

export const getCustomerUpdateById = async (id) => {
  return getRecordById(Tables.CustomerUpdates, id);
};

export const getCustomerUpdatesByIds = async (ids, filterByFormula = '', sort = []
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

export const getMeterReadingsandInvoiceById = async (id) => {
  return getRecordById(Tables.MeterReadingsandInvoices, id);
};

export const getMeterReadingsandInvoicesByIds = async (ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.MeterReadingsandInvoices, formula, sort);
};

export const getAllMeterReadingsandInvoices = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.MeterReadingsandInvoices, filterByFormula, sort);
};

export const getPaymentById = async (id) => {
  return getRecordById(Tables.Payments, id);
};

export const getPaymentsByIds = async (ids, filterByFormula = '', sort = []
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

export const getFinancialSummaryById = async (id) => {
  return getRecordById(Tables.FinancialSummaries, id);
};

export const getFinancialSummariesByIds = async (ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.FinancialSummaries, formula, sort);
};

export const getAllFinancialSummaries = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.FinancialSummaries, filterByFormula, sort);
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

export const updateMeterReadingsandInvoice = async (id, recordUpdates) => {
  return updateRecord(Tables.MeterReadingsandInvoices, id, recordUpdates);
};

export const updateManyMeterReadingsandInvoices = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.MeterReadingsandInvoices, subset));
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

export const updateFinancialSummarie = async (id, recordUpdates) => {
  return updateRecord(Tables.FinancialSummaries, id, recordUpdates);
};

export const updateManyFinancialSummaries = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.FinancialSummaries, subset));
  }
  return Promise.all(updatePromises);
};

/*
 ******* DELETE RECORDS *******
 */

export const deleteUser = async (id) => {
  return deleteRecord(Tables.Users, id);
};
export const deleteSite = async (id) => {
  return deleteRecord(Tables.Sites, id);
};
export const deleteTariffPlan = async (id) => {
  return deleteRecord(Tables.TariffPlans, id);
};
export const deleteCustomer = async (id) => {
  return deleteRecord(Tables.Customers, id);
};
export const deleteCustomerUpdate = async (id) => {
  return deleteRecord(Tables.CustomerUpdates, id);
};
export const deleteMeterReadingsandInvoice = async (id) => {
  return deleteRecord(Tables.MeterReadingsandInvoices, id);
};
export const deletePayment = async (id) => {
  return deleteRecord(Tables.Payments, id);
};
export const deleteFinancialSummarie = async (id) => {
  return deleteRecord(Tables.FinancialSummaries, id);
};
