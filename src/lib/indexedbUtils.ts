// Creates a DBRequest for the given dbName.
// After being called, the caller should set an onsuccess function
// to be run for when the DBRequest resolves.
const createDBRequest = (dbName: string): IDBRequest => {
  const dbRequest = indexedDB.open(dbName);

  dbRequest.onerror = (event) => {
    console.error(`Error when opening indexedb connection for ${dbName}`);
  };

  return dbRequest;
};

const createTransaction = (dbInstance: IDBDatabase, storeNames: string[]): IDBTransaction => {
  return dbInstance.transaction(storeNames, 'readwrite');
};

const openObjectStore = (transactionInstance: IDBTransaction, storeName: string): IDBObjectStore => {
  return transactionInstance.objectStore(storeName);
};

export { createDBRequest, createTransaction, openObjectStore };
