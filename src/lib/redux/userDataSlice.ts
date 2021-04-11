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
  user: User | null;
  lastUpdated: string;
  isOnline: boolean;
  siteUsers: EntityState<UserRecord>;
}

const initialState: UserDataState = {
  isLoading: false,
  user: null,
  lastUpdated: '',
  isOnline: true,
  siteUsers: siteUsersAdapter.getInitialState(),
};

export const EMPTY_USER: User = {
  id: '',
  createdTime: '',
  fields: {
    ID: '',
    Password: '',
    Username: '',
    Admin: false,
  },
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setLoadingForUserData(state) {
      state.isLoading = true;
    },
    setIsOnline(state, action) {
      state.isOnline = action.payload.isOnline;
    },
    saveUserData(state, action) {
      state.user = { ...action.payload };
      state.isLoading = false;
      state.lastUpdated = moment().toString();
      state.isOnline = true;
    },
    saveSiteUsersData(state, action) {
      const siteUserEntities = siteUsersAdapter.addMany(state.siteUsers, action.payload);
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
  setIsOnline,
  saveSiteUsersData,
  deauthenticateAndClearUserData,
} = userDataSlice.actions;
export default userDataSlice.reducer;
