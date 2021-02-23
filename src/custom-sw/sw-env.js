require('dotenv').config();
const fs = require('fs');

// Transfers environment variables into build environment
const transferEnvironmentVariables = () => {

    fs.writeFileSync('build/sw-env.js',
        `
    const process = {
        env: {
            REACT_APP_AIRTABLE_ENDPOINT_URL: '${process.env.REACT_APP_AIRTABLE_ENDPOINT_URL}',
            REACT_APP_AIRTABLE_BASE_ID: '${process.env.REACT_APP_AIRTABLE_BASE_ID}',
        }
    }
    `
    )
}

transferEnvironmentVariables();
