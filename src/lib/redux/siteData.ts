import { createSelector } from '@reduxjs/toolkit';
import { SiteRecord } from '../airtable/interface';
import { setCurrentSiteId } from './siteDataSlice';
import { RootState, store } from './store';

export const setCurrentSite = (newSite: any): void => {
  store.dispatch(setCurrentSiteId(newSite.id))
};

export const selectCurrentSiteId = (state: RootState) => state.siteData.currentSiteId;

export const selectCurrentSiteInformation = createSelector(
  selectCurrentSiteId,
  store.getState,
  (siteId, state) => state.siteData.sites[siteId].siteInformation)

// Returns all SiteRecord[] information
export const selectAllSitesInformation = (state: RootState): SiteRecord[] => Object.values(state.siteData.sites).map(site => site.siteInformation);

export const selectSiteDataIsLoading = (state: RootState): boolean => state.siteData.isLoading;
