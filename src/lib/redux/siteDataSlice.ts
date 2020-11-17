/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  sites: {},
};

const siteDataSlice = createSlice({
  name: 'siteData',
  initialState,
  reducers: {
    setLoadingForSiteData(state) {
      state.isLoading = true;
    },
    saveSiteData(state, action) {
      const siteData = action.payload;
      state.sites = siteData;
      state.isLoading = false;
    },
  },
});

export const { setLoadingForSiteData, saveSiteData } = siteDataSlice.actions;
export default siteDataSlice.reducer;
