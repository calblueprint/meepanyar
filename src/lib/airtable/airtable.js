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

const checkSameCustomer = (customerOne, customerTwo) => {
    const firstName = customerOne.name;
    const secondName = customerTwo.name;
    const firstMeterNumber = customerOne.meterNumber;
    const secondMeterNumber = customerTwo.meterNumber;

    return firstName && secondName && firstName === secondName && firstMeterNumber === secondMeterNumber;
}

const addToOfflineCustomer = async (customer, fieldToAppend, objectToAdd) => {
    const db = await openDB('workbox-background-sync');
    const getTransaction = db.transaction('requests', 'readwrite');
    const objectStore = getTransaction.objectStore('requests');
    let requestCursor = await objectStore.openCursor();
    const requestKeyToValue = {};

    console.log(customer, fieldToAppend, objectToAdd);

    // In this transaction, iterate through all the requests and store them in the requestKeyValues
    while (requestCursor) {
        try {
            const requestValue = requestCursor.value;
            const requestKey = requestCursor.key;
            console.log(requestKey, requestValue);

            if (requestValue && requestValue.storableRequest && requestValue.storableRequest.requestInit) {
                requestKeyToValue[requestKey] = requestValue;
            }
        } catch (error) {
            console.log('Error when iterating through cursor on key ', requestCursor.key);
        }
        requestCursor = await requestCursor.continue();
    }
    await getTransaction.done;

    // Decode the requestBlobs and replace if appropriate
    for (const [requestKeyString, requestValue] of Object.entries(requestKeyToValue)) {
        console.log("Request value: ", requestValue);
        const requestBodyBlob = requestValue.storableRequest.requestInit.body;
        const requestBody = await requestBodyBlob.text();
        const createCustomerJSON = JSON.parse(requestBody);

        if (checkSameCustomer(customer, createCustomerJSON)) {
            const modifiedRequest = { ...requestValue };
            createCustomerJSON[fieldToAppend].push(objectToAdd);
            const modifiedCustomerJSON = JSON.stringify(createCustomerJSON);
            modifiedRequest.storableRequest.requestInit.body = new Blob([modifiedCustomerJSON], { type: 'application/json' });

            const requestKey = isNaN(requestKeyString) ? requestKeyString : parseInt(requestKeyString);

            console.log("Modified request: ", modifiedRequest);
            await db.put('requests', modifiedRequest, requestKey);
        } else {
            console.log("Not same customer!");
        }
    }
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
    if (!customer.rid) {
        addToOfflineCustomer(customer, 'meterReadings', meterReading)
    } else {
        try {
            meterReading.customerId = customer.rid;
            const resp = await fetch('http://127.0.0.1:4000/meter-readings-and-invoices/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(meterReading)
            })
            console.log("Response for meter reading: ", resp);
        } catch (err) {
            console.log('Error: ', err);
        }
    }
}

// Create a meter reading for a customer
const createPayment = async (customer, payment) => {
    if (!customer.id) {
        addToOfflineCustomer(customer, 'payments', payment);
    } else {
        const customerId = customer.id;
        const paymentData = {
            customerId: [customerId],
            // Whatever else a payment needs
        }
    }
}

export { base, createCustomer, createMeterReadingsandInvoice, createPayment };