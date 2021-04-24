// TODO: Return with robust ID generation.
// We could probably have all offlineIDs be generate through 1 function if we pass
// the redux slice / entity to generate the ID for?
export const generateOfflineId = (): string => {
  return Math.floor(Math.random() * 1000).toString();
};

// If the record id has 'rec', we assume it's in Airtable's format
// so it's not an offline id.
export const isOfflineId = (id: string): boolean => {
  return !id.includes('rec');
};
