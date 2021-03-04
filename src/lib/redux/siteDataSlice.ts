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
      state.currentSite = action.payload;
    },
    addNewCustomer(state, action) {
      return {
      ...state,
      currentSite:{
        ...state.currentSite,
        customers:[
          ...state.currentSite.customers, action.payload
        ]
        }
      }
      }
  },
});

export const { setLoadingForSiteData, saveSiteData, setCurrSite, addNewCustomer } = siteDataSlice.actions;
export default siteDataSlice.reducer;
