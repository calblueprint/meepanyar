import Airtable from '@calblueprint/airlock';

const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const API_KEY = 'airlock';
const ENDPOINT_URL = process.env.REACT_APP_AIRTABLE_ENDPOINT_URL;

Airtable.configure({
    endpointUrl: ENDPOINT_URL,
    apiKey: API_KEY,
});

const base = Airtable.base(BASE_ID);

const addToOfflineCustomer = (customer, fieldToAppend, objectToAdd) => {
    const dbRequest = indexedDB.open('workbox-background-sync');

    dbRequest.onerror = event => {
        console.error(`Error when opening indexedb in order to add a ${fieldToAppend} with error ${event.target.errorCode}`);
    }
    dbRequest.onsuccess = event => {
        const dbInstance = event.target.result;
        const objectStore = dbInstance.transaction(["requests"], "readwrite").objectStore("requests")

        objectStore.openCursor().onsuccess = event => {
            const cursor = event.target.result;

            if (cursor) {
                console.log("Cursor key: ", cursor.key);
                console.log("Cursor value: ", cursor.value);
                const cursorValue = { ...cursor.value };
                const newBody = JSON.stringify({ uhOh: "stinky" })
                const newBlob = new Blob([newBody], { type: 'application/json' })
                cursorValue.storableRequest.requestInit.body = newBlob;
                console.log("Changed value: ", cursorValue);

                const updateRequest = cursor.update(cursorValue);
                updateRequest.onsucces = event => {
                    console.log("Cursor update success");
                };
                updateRequest.onerror = event => {
                    console.log("Cursor update error", event);
                }

                cursor.continue();
            } else {
                console.log("Cursor finished iterating");
            }
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