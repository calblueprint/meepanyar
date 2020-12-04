import Airtable from '@calblueprint/airlock';
import { openDB } from 'idb';

const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const API_KEY = 'airlock';
const ENDPOINT_URL = process.env.REACT_APP_AIRTABLE_ENDPOINT_URL;

Airtable.configure({
    endpointUrl: ENDPOINT_URL,
    apiKey: API_KEY,
});

const base = Airtable.base(BASE_ID);

const addToOfflineCustomer = async (customer, fieldToAppend, objectToAdd) => {
    const db = await openDB('workbox-background-sync');
    const transaction = db.transaction('requests', 'readwrite');
    const objectStore = transaction.objectStore('requests');
    let requestCursor = await objectStore.openCursor();
    const requestKeyToValue = {};
    const requestKeyToBody = {};

    console.log(customer, fieldToAppend, objectToAdd);

    // In this transaction, iterate through all the requests and store them in the requestKeyValues
    while (requestCursor) {
        try {
            const requestValue = requestCursor.value;
            const requestKey = requestCursor.key;
            console.log(requestKey, requestValue);

            if (requestValue && requestValue.storableRequest && requestValue.storableRequest.requestInit) {
                const requestBlob = requestValue.storableRequest.requestInit.body;
                requestKeyToValue[requestKey] = requestBlob;
            }
        } catch (error) {
            console.log('Error when iterating through cursor on key ', requestCursor.key);
        }
        requestCursor = await requestCursor.continue();
    }
    await transaction.done;

    // Decode the requestBlobs
    for (const [requestKey, requestValue] of Object.entries(requestKeyToValue)) {
        const requestBodyBlob = requestValue.storableRequest.requestInit.body;
        const requestBody = await requestBodyBlob.text();
        const requestBodyJSON = JSON.parse(requestBody);
        requestKeyToBody[requestKey] = requestBodyJSON;
    }

    // Decode the requestBlobs


    // const dbRequest = createDBRequest('workbox-background-sync');

    // dbRequest.onsuccess = event => {
    //     const dbInstance = event.target.result;
    //     const transactionInstance = createTransaction(dbInstance, ["requests"]);
    //     const objectStore = openObjectStore(transactionInstance, "requests");

    //     objectStore.openCursor().onsuccess = event => {
    //         const cursor = event.target.result;

    //         if (cursor) {
    //             try {
    //                 console.log("Cursor key: ", cursor.key);
    //                 console.log("Cursor value: ", cursor.value);
    //                 const cursorValue = { ...cursor.value };
    //                 const requestBodyBlob = cursorValue.storableRequest.requestInit.body;

    //                 getJSONFromBlob(requestBodyBlob).then(bodyObject => {
    //                     console.log("Body object ", bodyObject);

    //                 })

    //             } catch (error) {
    //                 console.log("Error occurred when iterating through cursor ", error);
    //                 cursor.continue();
    //             }

    //             const newBody = JSON.stringify({
    //                 ...customer,
    //                 [fieldToAppend]: [objectToAdd]
    //             })
    //             const newBlob = new Blob([newBody], { type: 'application/json' })
    //             cursorValue.storableRequest.requestInit.body = newBlob;
    //             console.log("Changed value: ", cursorValue);

    //             const updateRequest = cursor.update(cursorValue);
    //             updateRequest.onsucces = event => {
    //                 console.log("Cursor update success");
    //             };
    //             updateRequest.onerror = event => {
    //                 console.log("Cursor update error", event);
    //             }

    //             cursor.continue();
    //         } else {
    //             console.log("Cursor finished iterating");
    //         }
    //     }
    // }
}

const createCustomer = async (customer) => {
    try {
        const resp = await fetch('http://127.0.0.1:4000/customer/create', {
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

// Create a meter reading for a customer
const createMeterReadingsandInvoice = async (customer, meterReading) => {
    // If customer does not exist, we want to search the requests objectStore
    // to add the current meter reading to the customer request being POST'ed
    if (!customer.id) {
        addToOfflineCustomer(customer, 'METER_READING', meterReading)
    } else {
        // Just make a standard airlock call
        const customerId = customer.id;
        const meterReadingData = {
            customerId: [customerId],
            // Whatever else a meter reading needs
        }
    }
}

// Create a meter reading for a customer
const createPayment = async (customer, payment) => {
    if (!customer.id) {
        addToOfflineCustomer(customer, 'PAYMENT', payment);
    } else {
        const customerId = customer.id;
        const paymentData = {
            customerId: [customerId],
            // Whatever else a payment needs
        }
    }
}

export { base, createCustomer, createMeterReadingsandInvoice, createPayment };