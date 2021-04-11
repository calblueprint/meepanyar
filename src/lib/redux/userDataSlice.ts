/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import moment from 'moment';
import { UserRecord } from '../airtable/interface';
import { RootState } from './store';

// TODO: Think about what data should be stored in here

const siteUsersAdapter = createEntityAdapter<UserRecord>();

// Customized selectors for site users
export const {
  selectEntities: selectAllSiteUsersArray,
  selectAll: selectAllSiteUsers,
  selectById: selectSiteUserById,
  selectIds: selectSiteUserIds,
} = siteUsersAdapter.getSelectors((state: RootState) => state.userData.siteUsers);

interface UserFields {
  ID: string;
  Password: string;
  Username: string;
  Admin: boolean;
  အမည်?: string;
  Name?: string;
  Email?: string;
  Incidents?: string[];
  Site?: string[];
  Customers?: string[];
}

export interface User {
  id: string;
  createdTime: string;
  fields: UserFields;
}

interface UserDataState {
  isLoading: boolean;
  lastUpdated: string;
  isOnline: boolean;
  siteUsers: EntityState<UserRecord>;
  currentUserId: string;
}

const initialState: UserDataState = {
  isLoading: false,
  lastUpdated: '',
  isOnline: true,
  siteUsers: siteUsersAdapter.getInitialState(),
  currentUserId: '',
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setLoadingForUserData(state) {
      state.isLoading = true;
    },
    setCurrentUserId(state, action) {
      state.currentUserId = action.payload;
    },
    setIsOnline(state, action) {
      state.isOnline = action.payload.isOnline;
    },
    saveUserData(state, action) {
      siteUsersAdapter.upsertOne(state.siteUsers, action.payload);
      state.isLoading = false;
      state.lastUpdated = moment().toString();
      state.isOnline = true;
    },
    saveSiteUsersData(state, action) {
      const siteUserEntities = siteUsersAdapter.upsertMany(state.siteUsers, action.payload);
      state.siteUsers = siteUserEntities;
    },
    deauthenticateAndClearUserData() {
      return { ...initialState };
    },
  },
});

export const {
  setLoadingForUserData,
  saveUserData,
  setCurrentUserId,
  setIsOnline,
  saveSiteUsersData,
  deauthenticateAndClearUserData,
} = userDataSlice.actions;
export default userDataSlice.reducer;
