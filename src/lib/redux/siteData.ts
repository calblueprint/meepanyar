import { createSelector } from '@reduxjs/toolkit';
import { SiteRecord } from '../airtable/interface';
import { setCurrentSiteId } from './siteDataSlice';
import { store, RootState } from './store';

export const setCurrentSite = (newSite: any): void => {
  store.dispatch(setCurrentSiteId(newSite.id))
};

export const getCurrentSiteId = (): string => {
  return store.getState().siteData.currentSiteId;
}

export const selectCurrentSiteId = (state: RootState) => state.siteData.currentSiteId;

export const selectCurrentSite = createSelector(
  selectCurrentSiteId,
  store.getState,
  (siteId, state) => state.siteData.sites[siteId].siteInformation)

// Returns all SiteRecord[] information
export const selectAllSites = (state: RootState) : SiteRecord[] => Object.values(state.siteData.sites).map(site => site.siteInformation);
