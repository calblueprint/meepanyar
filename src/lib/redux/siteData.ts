import { createSelector } from '@reduxjs/toolkit';
import { SiteRecord, TariffPlanRecord, FinancialSummaryRecord } from '../airtable/interface';
import { setCurrentSiteId, updateTariffPlan, updateSite } from './siteDataSlice';
import { selectCurrentPeriodPurchaseRequestsApprovedTotalAmountSpent, selectCurrentPeriodPurchaseRequestsDeniedTotalAmountSpent } from './inventoryData';
import { selectCustomersToCollect, selectCustomersDone, selectCurrentPeriodTotalAmountBilled, selectCurrentPeriodTotalAmountCollected } from './customerData';
import { getCurrentPeriod } from '../moment/momentUtils';
import { selectAllCustomersArray } from './customerDataSlice';
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
  (currentSiteRecord : SiteRecord) => currentSiteRecord.gracePeriod)

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

export const updateSiteInRedux = (siteUpdates : Partial<SiteRecord>) => {
  store.dispatch(updateSite(siteUpdates))
}

export const selectCurrentSiteProfit = (state: RootState) => {
  return selectCurrentPeriodTotalAmountCollected(state) - selectCurrentPeriodPurchaseRequestsApprovedTotalAmountSpent(state);
}

export const selectCurrentFinancialSummary = () => {
  const state = store.getState();
  const customers = selectAllCustomersArray(state);
  const customersBilled = selectCustomersToCollect(state);
  const customersPaid = selectCustomersDone(state);
  const totalAmountBilled = selectCurrentPeriodTotalAmountBilled(state);
  const totalAmountCollected =  selectCurrentPeriodTotalAmountCollected(state);
  const totalProfit = selectCurrentSiteProfit(state);
  const inventoryAmountApproved = selectCurrentPeriodPurchaseRequestsApprovedTotalAmountSpent(state);
  const inventoryAmountDenied = selectCurrentPeriodPurchaseRequestsDeniedTotalAmountSpent(state);

  const currentReport: FinancialSummaryRecord = {
    id: '',
    name: '',
    totalCustomers: customers.length,
    totalCustomersBilled: customersBilled.length,
    totalCustomersPaid: customersPaid.length,
    totalUsage: 0,
    totalAmountBilled,
    totalAmountCollected,
    totalAmountSpent: 0,
    totalProfit,
    inventoryAmountApproved,
    inventoryAmountDenied,
    period: getCurrentPeriod(),
    isapproved: false,
    lastUpdated: '0',
    issubmitted: false,
  }

  return currentReport;
}

// Rounds number to at most 2 decimal points
// And converts to string
export const round = (number: number) => {
  return (Math.round(number * 100) / 100).toString();
}
