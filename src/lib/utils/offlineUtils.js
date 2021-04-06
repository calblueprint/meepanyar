
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
