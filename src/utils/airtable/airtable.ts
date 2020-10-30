/* eslint no-restricted-imports: 0 */
/*
  THIS IS A GENERATED FILE
  Changes might be overwritten in the future, edit with caution!

  Helper functions that makes airtable API calls directly
  Not meant to be called directly by functions outside of request.js

  If you're adding a new function: make sure you add a corresponding test (at least 1) for it in airtable.spec.js
*/
import Airtable from 'airtable';
// import Airtable from '@calblueprint/airlock';
import { Row } from './interface';

const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;

const API_KEY = process.env.REACT_APP_AIRTABLE_API_KEY;
const ENDPOINT_URL = 'https://api.airtable.com';
// const API_KEY = 'airlock';
// const ENDPOINT_URL = process.env.REACT_APP_AIRTABLE_ENDPOINT_URL;
const VIEW = 'Grid view';

Airtable.configure({
  endpointUrl: ENDPOINT_URL,
  apiKey: API_KEY,
});

const base = Airtable.base(BASE_ID as string);

// ******** CRUD ******** //

// Given a table, get all records from Airtable

function getAllRecords<T>(table: string, filterByFormula = '', sort = [], format: (row: Row) => T): Promise<T[]> {
  const transformedRecords: T[] = [];

  return base(table)
    .select({
      view: VIEW,
      filterByFormula,
      sort,
    })
    .all()
    .then((records) => {
      if (records === null || records.length < 1) {
        return [];
      }
      records.forEach((record: unknown) => {
        const row: unknown = record;
        const formatted = format(row as Row);
        transformedRecords.push(formatted);
      });
      return transformedRecords;
    })
    .catch((err) => {
      throw err;
    });
}

// Given a table and record ID, return the associated record object using a Promise.
function getRecordById<T>(table: string, id: string, format: (row: Row) => T): Promise<T> {
  return base(table)
    .find(id)
    .then((record) => {
      const row: unknown = record;
      return format(row as Row);
    })
    .catch((err) => {
      throw err;
    });
}

/*
  Given the desired table, field type (column), and field value ('nick wong' or 'aivant@pppower.io'),
  return the associated record object.

  NOTE: `fieldValue` is a generic type - values can be a bit tricky. Notably, string type names must be further escaped.
  Usage:
    - getStoresByStoreName("'A & S Grocery'") --> `{Store Name} = 'A & S Grocery'`
    - getProductsByPoints(325) --> `{Points} = 325`
    - getStoresByOpen('TRUE()') --> `{Open} = TRUE()`
*/
function getRecordsByAttribute<T>(
  table: string,
  fieldType: string,
  fieldValue: unknown,
  filterByFormula = '',
  sort = [],
  format: (row: Row) => T,
): Promise<T[]> {
  const transformedRecords: T[] = [];

  return base(table)
    .select({
      view: VIEW,
      filterByFormula: filterByFormula
        ? `AND(${filterByFormula}, {${fieldType}}=${fieldValue})`
        : `{${fieldType}}=${fieldValue}`,
      sort,
    })
    .all()
    .then((records) => {
      if (!records || records.length < 1) {
        // No need for this to throw an error, sometimes there're just no values
        return [];
      }
      records.forEach((record: unknown) => {
        const row: unknown = record;
        const formatted = format(row as Row);
        transformedRecords.push(formatted);
      });
      return transformedRecords;
    })
    .catch((err) => {
      throw err;
    });
}

// Given a table and a record ID, delete a record on Airtable.
function deleteRecord(table: string, id: string): Promise<void> {
  return base(table)
    .destroy([id])
    .then(() => {return;})
    .catch((err) => {
      throw err;
    });
}

export { base, getAllRecords, getRecordById, getRecordsByAttribute, deleteRecord };
