
// TODO: Return with robust ID generation. 
// We could probably have all offlineIDs be generate through 1 function if we pass
// the redux slice / entity to generate the ID for?
export const generateOfflineId = () => {
    return (Math.floor(Math.random() * 1000)).toString();
}
