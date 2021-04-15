/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { RootState } from './store';
import { SiteRecord, FinancialSummaryRecord, TariffPlanRecord, SiteId } from '../airtable/interface';

const tariffPlanAdapter = createEntityAdapter<TariffPlanRecord>();
const financialSummaryAdapter = createEntityAdapter<FinancialSummaryRecord>();

// Returns tariff plans in the context of the current site
export const {
  selectEntities: selectAllTariffPlans,
  selectAll: selectAllTariffPlansArray,
  selectById: selectTariffPlanById,
  selectIds: selectTariffPlanIds
} = tariffPlanAdapter.getSelectors(
  (state: RootState) => state.siteData.sites[state.siteData.currentSiteId].tariffPlans);

// Returns financial summaries in the context of the current site
export const {
  selectEntities: selectAllFinancialSummaries,
  selectAll: selectAllFinancialSummariesArray,
  selectById: selectFinancialSummaryById,
  selectIds: selectFinancialSummaryIds
} = financialSummaryAdapter.getSelectors(
  (state: RootState) => state.siteData.sites[state.siteData.currentSiteId].financialSummaries);

interface SiteData {
  siteInformation: SiteRecord;
  tariffPlans: EntityState<TariffPlanRecord>;
  financialSummaries: EntityState<FinancialSummaryRecord>;
}


interface siteDataSliceState {
  isLoading: boolean;
  currentSiteId: string;
  sites: Record<SiteId, SiteData>;
}

const initialState: siteDataSliceState = {
  isLoading: false,
  currentSiteId: '',
  sites: {},
};

export const EMPTY_SITE: SiteRecord = {
  id: '',
  name: '',
  customerIds: [],
  customers: [],
  financialSummaryIds: [],
  financialSummaries: [],
  tariffPlans: [],
};

export const EMPTY_FINANCIAL_SUMMARY: FinancialSummaryRecord = {
  id: '',
  name: '',
  totalCustomers: 0,
  totalCustomersBilled: 0,
  totalCustomersPaid: 0,
  totalUsage: 0,
  totalAmountBilled: 0,
  totalAmountCollected: 0,
  totalAmountSpent: 0,
  totalProfit: 0,
  period: '',
  isapproved: true,
  lastUpdated: '',
  issubmitted: false,
}

const EMPTY_SITE_DATA: SiteData = {
  siteInformation: EMPTY_SITE,
  tariffPlans: tariffPlanAdapter.getInitialState(),
  financialSummaries: financialSummaryAdapter.getInitialState()
}

const siteDataSlice = createSlice({
  name: 'siteData',
  initialState,
  reducers: {
    setLoadingForSiteData(state) {
      state.isLoading = true;
    },
    saveSiteData(state, action) {
      const { sites, currentSite } = action.payload;

      sites.forEach((site: SiteRecord) => {
        const siteId = site.id;
        const siteTariffPlans = site.tariffPlans;
        const siteFinancialSummaries = site.financialSummaries;

        state.sites[siteId] = JSON.parse(JSON.stringify(EMPTY_SITE_DATA));

        const tariffPlanEntities =
          tariffPlanAdapter.addMany(state.sites[siteId].tariffPlans, siteTariffPlans as TariffPlanRecord[]);
        state.sites[siteId].tariffPlans = tariffPlanEntities;

        const financialSummaryEntities =
          financialSummaryAdapter.addMany(state.sites[siteId].financialSummaries, siteFinancialSummaries as FinancialSummaryRecord[]);
        state.sites[siteId].financialSummaries = financialSummaryEntities;

        delete site.tariffPlans;
        delete site.financialSummaries
        state.sites[siteId].siteInformation = site;
      })

      state.currentSiteId = currentSite.id;
      state.isLoading = false;
    },
    setCurrentSiteId(state, action) {
      state.currentSiteId = action.payload;
    },
    updateTariffPlan(state, action) {
      const { siteId, id, ...changes } = action.payload;

      const updates = {
        id,
        changes
      }
      tariffPlanAdapter.updateOne(state.sites[siteId].tariffPlans, updates);
    },
    updateSite(state, action) {
      const { id } = action.payload;
      const newSiteInformation = {...state.sites[id].siteInformation, ...action.payload};
      state.sites[id].siteInformation = newSiteInformation;
    }
  },
});

export const { setLoadingForSiteData, saveSiteData, setCurrentSiteId, updateTariffPlan, updateSite } = siteDataSlice.actions;
export default siteDataSlice.reducer;
