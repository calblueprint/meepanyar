import { openDB } from 'idb';

// We define a customer to be the same if they have the same
export const checkSameCustomer = (customerOne, customerTwo) => {
    // Check rids if available, check those
    if (customerOne.rid && customerTwo.rid && customerOne.rid === customerTwo.rid) {
        return true;
    }

    const firstName = customerOne.name;
    const secondName = customerTwo.name;
    const firstMeterNumber = customerOne.meterNumber;
    const secondMeterNumber = customerTwo.meterNumber;

    return firstName && secondName && firstName === secondName && firstMeterNumber === secondMeterNumber;
}

// This function is called when creating meterReadings or payments for an offline customer
// (one that is not yet in the airtable). We look for the "create customer" request in the
// background-sync object store and modify the request to include creating a meterReading / payment as well.
export const addToOfflineCustomer = async (customer, fieldToAppend, objectToAdd) => {
    let db, getTransaction, objectStore, requestCursor;
    const requestKeyToValue = {};
    try {
        db = await openDB('workbox-background-sync');
        getTransaction = db.transaction('requests');
        objectStore = getTransaction.objectStore('requests');
        requestCursor = await objectStore.openCursor();
    } catch (err) {
        console.log("Error when opening DB transaction. Exiting without modifying request.")
        return;
    }

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

    // Decode the requestBlobs and append a value to the field if a matching customer is found
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

// TODO: Return with robust ID generation. 
// We could probably have all offlineIDs be generate through 1 function if we pass
// the redux slice / entity to generate the ID for?
export const generateOfflineId = () => {
    return (Math.floor(Math.random() * 1000)).toString();
}

// Airtable records are alphanumeric, and right now
// offlineIDs are only numeric. We check if a given ID
// is a number to determine if it is an offline ID.
// NOTE: This should change depending on if we switch ID generation schemes
export const isOfflineId = (id) => {
    return !isNaN(id);
}
