import Airtable from '@calblueprint/airlock';

const BASE_ID = process.env.REACT_APP_AIRTABLE_BASE_ID;
const API_KEY = 'airlock';
const ENDPOINT_URL = process.env.REACT_APP_AIRTABLE_ENDPOINT_URL;

Airtable.configure({
    endpointUrl: ENDPOINT_URL,
    apiKey: API_KEY,
});

const base = Airtable.base(BASE_ID);


export { base };