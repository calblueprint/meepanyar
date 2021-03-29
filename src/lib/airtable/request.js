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
import { addCustomerToRedux, editCustomerInRedux, setCurrentCustomerInRedux } from '../../lib/redux/customerData';
import { addToOfflineCustomer } from '../utils/offlineUtils';
import { addInventoryToRedux } from '../redux/inventoryData';
import { generateOfflineInventoryId } from '../utils/inventoryUtils';
import { generateOfflineId } from '../utils/offlineUtils'

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
  let customerId = '';
  try {
    const resp = await fetch(`${process.env.REACT_APP_AIRTABLE_ENDPOINT_URL}/customers/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(customer)
    })
    console.log(resp);
    await resp.json().then(data => customerId = data.id);
  } catch (err) {
    console.log(err);
    customerId = generateOfflineId();
  }
  customer.id = customerId;
  addCustomerToRedux(customer);
  return customerId;
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
export const createMeterReadingandInvoice = async (meterReading, customer) => {
  // If customer does not exist, we want to search the requests objectStore
  // to add the current meter reading to the customer request being POST'ed
  if (!customer.rid) {
    addToOfflineCustomer(customer, 'meterReadings', meterReading)
  } else {
    // Customer has an rid so it is in the airtable.
    // Make a standard request to create a meter reading / invoice.
    try {
      meterReading.customerId = customer.rid;
      const resp = await fetch(`${process.env.REACT_APP_AIRTABLE_ENDPOINT_URL}/meter-readings-and-invoices/create`, {
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
      const resp = await fetch(`${process.env.REACT_APP_AIRTABLE_ENDPOINT_URL}/payments/create`, {
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

export const createFinancialSummary = async (record) => {
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

export const createProduct = async (record) => {
  return createRecord(Tables.Products, record);
};

export const createManyProducts = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.Products, subset));
  }
  return Promise.all(createPromises);
};

// NONGENERATED: Create an inventory record (add product to site)
export const createInventory = async (inventory) => {
  // Site and product must already exist in Airtable.
  // Make a standard request to create an inventory item.
  let inventoryId = "";
  try {
    const resp = await fetch(`${process.env.REACT_APP_AIRTABLE_ENDPOINT_URL}/inventory/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inventory)
    })
    console.log('Response for inventory: ', resp);
    await resp.json().then(data => inventoryId = data.id);
  } catch (err) {
    inventoryId = generateOfflineInventoryId();
    console.log('Error with create inventory request: ', err);
  }
  inventory.id = inventoryId;
  addInventoryToRedux(inventory);
  return inventory;
}

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

export const createPurchaseRequest = async (record) => {
  return createRecord(Tables.PurchaseRequests, record);
};

export const createManyPurchaseRequests = async (records) => {
  const createPromises = [];
  const numCalls = Math.ceil(records.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = records.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      createPromises.push(createRecords(Tables.PurchaseRequests, subset));
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

export const getMeterReadingandInvoiceById = async (id) => {
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

export const getProductById = async (id) => {
  return getRecordById(Tables.Products, id);
};

export const getProductsByIds = async (ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.Products, formula, sort);
};

export const getAllProducts = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.Products, filterByFormula, sort);
};

export const getInventoryById = async (id) => {
  return getRecordById(Tables.Inventory, id);
};

export const getInventorysByIds = async (ids, filterByFormula = '', sort = []
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

export const getPurchaseRequestById = async (id) => {
  return getRecordById(Tables.PurchaseRequests, id);
};

export const getPurchaseRequestsByIds = async (ids, filterByFormula = '', sort = []
) => {
  let formula = `OR(${ids.reduce(
    (f, id) => `${f} {ID}='${id}',`,
    ''
  )} 1 < 0)`;
  formula = filterByFormula ? `AND(${filterByFormula}, ${formula})` : formula;
  return getAllRecords(Tables.PurchaseRequests, formula, sort);
};

export const getAllPurchaseRequests = async (filterByFormula = '', sort = []) => {
  return getAllRecords(Tables.PurchaseRequests, filterByFormula, sort);
};

export const getInventoryUpdateById = async (id) => {
  return getRecordById(Tables.InventoryUpdates, id);
};

export const getInventoryUpdatesByIds = async (ids, filterByFormula = '', sort = []
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

// NONGENERATED: Edit customer
export const editCustomer = async (customer, customerUpdate) => {
  if (!customer.id) {
    addToOfflineCustomer(customer, 'edits', customerUpdate);
  } else {
    try {
      const { name, meterNumber, tariffPlanId, siteId, isactive, hasmeter } = customer;
      const { dateUpdated, customerId, explanation, userId } = customerUpdate;
      await updateCustomer(customer.id, {
        name,
        meterNumber,
        tariffPlanId,
        siteId,
        isactive,
        hasmeter,
      });
      console.log("Customer edited!");

      const updateId = await createCustomerUpdate({
        dateUpdated,
        customerId,
        explanation,
        userId
      });
      console.log("Update id: ", updateId);
      console.log("Created updates!");

      editCustomerInRedux(customer);
    } catch (err) {
      console.log(err);
    }
  }
}

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

export const updateMeterReadingandInvoice = async (id, recordUpdates) => {
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

export const updateFinancialSummary = async (id, recordUpdates) => {
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

export const updateProduct = async (id, recordUpdates) => {
  return updateRecord(Tables.Products, id, recordUpdates);
};

export const updateManyProducts = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.Products, subset));
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

export const updatePurchaseRequest = async (id, recordUpdates) => {
  return updateRecord(Tables.PurchaseRequests, id, recordUpdates);
};

export const updateManyPurchaseRequests = async (recordUpdates) => {
  const updatePromises = [];
  const numCalls = Math.ceil(recordUpdates.length / 10);
  for (let i = 0; i < numCalls; i += 1) {
    const subset = recordUpdates.slice(i * 10, (i + 1) * 10);
    if (subset.length > 0)
      updatePromises.push(updateRecords(Tables.PurchaseRequests, subset));
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
export const deleteFinancialSummary = async (id) => {
  return deleteRecord(Tables.FinancialSummaries, id);
};
export const deleteProduct = async (id) => {
  return deleteRecord(Tables.Products, id);
};
export const deleteInventory = async (id) => {
  return deleteRecord(Tables.Inventory, id);
};
export const deletePurchaseRequest = async (id) => {
  return deleteRecord(Tables.PurchaseRequests, id);
};
export const deleteInventoryUpdate = async (id) => {
  return deleteRecord(Tables.InventoryUpdates, id);
};
