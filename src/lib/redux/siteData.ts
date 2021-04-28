import { createSelector } from '@reduxjs/toolkit';
import { SiteRecord, TariffPlanRecord } from '../airtable/interface';
import { setCurrentSiteId, updateTariffPlan, updateSite, clearSiteData } from './siteDataSlice';
import { RootState, store } from './store';

export const setCurrentSite = (newSite: any): void => {
  store.dispatch(setCurrentSiteId(newSite.id))
};

export const selectCurrentSiteId = (state: RootState) => state.siteData.currentSiteId;

export const selectCurrentSiteInformation = createSelector(
  selectCurrentSiteId,
  store.getState,
  (siteId, state) => state.siteData.sites[siteId].siteInformation)

export const selectCurrentSiteGracePeriod = createSelector(
  selectCurrentSiteInformation,
  (currentSiteRecord: SiteRecord) => currentSiteRecord.gracePeriod)

export const clearSiteDataInRedux = (): void => {
  store.dispatch(clearSiteData());
};


// Returns all SiteRecord[] information
export const selectAllSitesInformation = (state: RootState): SiteRecord[] => Object.values(state.siteData.sites).map(site => site.siteInformation);

export const selectSiteDataIsLoading = (state: RootState): boolean => state.siteData.isLoading;

export const updateTariffPlanInRedux = (tariffPlan: Partial<TariffPlanRecord>) => {
  const tariffPlanUpdates = {
    ...tariffPlan,
    siteId: selectCurrentSiteId(store.getState()),
  };
  store.dispatch(updateTariffPlan(tariffPlanUpdates));
};

export const updateSiteInRedux = (siteUpdates: Partial<SiteRecord>) => {
  store.dispatch(updateSite(siteUpdates))
}