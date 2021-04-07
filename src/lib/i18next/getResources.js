const Airtable = require('airtable');
const dotenv = require("dotenv");
dotenv.config();

const BASE_ID = process.env.TRANSLATIONS_BASE_ID;
const API_KEY = process.env.TRANSLATIONS_API_KEY;
const ENDPOINT_URL = 'https://api.airtable.com';
const VIEW = 'Grid view';

Airtable.configure({
    endpointUrl: ENDPOINT_URL,
    apiKey: API_KEY,
});

const base = Airtable.base(BASE_ID);
const fs = require('fs');

/** 
 * Fetch all records in translation database.
 */
const getAllRecords = (table, filterByFormula = '', sort = []) => {
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
        const translations = {}; 
        for (const record of records) {
            translations[record.get('EN')] = record.get('MM')
        }
        return translations; 
      })
      .catch((err) => {
        throw err;
      });
}

/** 
 * Format JavaScript object with translations, storing in ./resources.js. 
 * formatted according to the conventions in https://react.i18next.com/ 
 */
const getAndSetTranslations = async () => {
    try {
        const resultData = await getAllRecords('Translation'); 
        const resources = { my: { translation: resultData } }; 
        const jsonResponse = JSON.stringify(resources, null, 2);
        fs.writeFileSync('./src/lib/i18next/resources.js', "export default " + jsonResponse, 'utf8');
        console.log('Successful pulling in translations'); 
    } catch (err) {
        console.error('Error when creating translations: ', err);
    }
}

getAndSetTranslations();