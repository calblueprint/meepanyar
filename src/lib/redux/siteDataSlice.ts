/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

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
      const newSiteId = action.payload;
      for (const site of state.sites) {
        if (site.id === newSiteId) {
          state.currentSite = site;
          break;
        }
      }
    },
  },
});

export const { setLoadingForSiteData, saveSiteData, setCurrSite } = siteDataSlice.actions;
export default siteDataSlice.reducer;
