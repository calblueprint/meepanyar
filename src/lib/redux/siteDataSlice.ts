/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { SiteRecord } from '../airtable/interface';

interface siteDataSliceState {
  isLoading: boolean;
  currentSite: any;
  sites: any[];
}

const initialState: siteDataSliceState = {
  isLoading: false,
  currentSite: null,
  sites: [],
};

export const EMPTY_SITE: SiteRecord = {
  rid: '',
  name: '',
  customerIds: [],
  customers: [],
  financialSummaryIds: [],
  financialSummaries: [],
};

const siteDataSlice = createSlice({
  name: 'siteData',
  initialState,
  reducers: {
    setLoadingForSiteData(state) {
      state.isLoading = true;
    },
    saveSiteData(state, action) {
      const { sites, currentSite } = action.payload;
      state.sites = sites;
      state.currentSite = currentSite;
      state.isLoading = false;
    },
    setCurrSite(state, action) {
      state.currentSite = action.payload;
    },
  },
});

export const { setLoadingForSiteData, saveSiteData, setCurrSite } = siteDataSlice.actions;
export default siteDataSlice.reducer;
