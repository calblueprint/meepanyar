# Mee Panyar

## Overview

This is the repository that holds the web client for Mee Panyar.
- For the associated backend repository, go to: https://github.com/calblueprint/meepanyar-node
- Documentation hub: https://github.com/calblueprint/meepanyar/wiki 


## Local Setup
1. Clone Repository
    a. Click on the green `Code` button and copy the https URL in the dropdown
    b. In your terminal, cd to the desired directory and do `git clone {COPIED URL}`
2. Setting Up Environment Variables
For security reasons, this project uses secrets that are passed via environment variables held in a `.env` file. You will create and set up your `.env` file in the following steps.
    a. In the top level directory (where `.env.example` is located), create a copy of `.env.example` and rename the copied file `.env`.
    b. Fill out the environment variables with their appropriate values in the `.env` file. The `REACT_APP_AIRTABLE_ENDPOINT_URL` should point to the URL where the `meepanyar-node` server is located.
    c. You may locate your `REACT_APP_AIRTABLE_BASE_ID` by going to https://airtable.com/api and clicking on the appropiate Airtable base to use.
    <br>

    For example, if your launched `meepanyar-node` server is on `localhost:4000`, which is the default, your `.env` file could look like the following:
    ```
    AIRTABLE_EMAIL=my_airtable_email@berkeley.edu
    AIRTABLE_PASSWORD=my_airtable_password
    REACT_APP_AIRTABLE_BASE_ID=my_airtable_base_id
    REACT_APP_AIRTABLE_ENDPOINT_URL=http://localhost:4000
    ```

3. Running the development environment
    1. Since the web client relies on the `meepanyar-node` backend server, make sure that an instance of `meepanyar-node` is running and that the environment variable `REACT_APP_AIRTABLE_ENDPOINT_URL` in the `.env` file points to it. Local setup instructions for the `meepanyar-node` server can be found at the repo [here](https://github.com/calblueprint/meepanyar-node)
    2. run `npm install` to install the dependencies necessary to run the app.
    3. Start the web client by running `npm start` in the terminal while in the root directory (where the `package.json` file is located)

4. Running the production environment (Not usually necessary for standard develop)

   **A production build must be used to test offline functionality of the app.** This is because service workers, which control the app logic when offline, are only active in the production build. This section will list how to create and run a production build of the app locally.
   
    1. As with the development environment, a working `meepanyar-node` backend must be running. **Do step 3i (Running the development environment)**
    2. run `npm install` to install the dependencies necessary to run the app.
    3. In the root directory, run `npm run build` to create the production build for the app. This command creates a `build/` folder that contains the production build for the app.
    4. Run the production build by running `serve -s build` in the root directory
   
    **Note:** if you get an error when running 4iv, you may need to install `serve` via `npm install -g serve`.


## Schema Generation
This app uses the [Airtable Schema Generator](https://github.com/aivantg/airtable-schema-generator) to generate boilerplate Airtable CRUD functions. **When the Airtable base's schema is changed (tables or columns are added or deleted), the schema must be regenerated.** You can regenerate the airtable by following the steps:
1. In your `.env` file make sure the `AIRTABLE_EMAIL`, `AIRTABLE_PASSWORD`, and `REACT_APP_AIRTABLE_BASE_ID` are populated.
2. Run `npm run generate-schema` in the root directory.
3. Apply the patches located in `src/lib/airtable/patches`. Instructions to apply patches are located in a README.md file in the patches directory `src/lib/airtable/patches/README.md`.
**NOTE**: These patches are needed to fix grammar mistakes in CRUD naming convention and adjust functions for offline functionality in the app
