/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

// TODO: Think about what data should be stored in here

interface UserFields {
  ID: string;
  Password: string;
  Username: string;
  အမည်?: string;
  Name?: string;
  Email?: string;
  Incidents?: string[];
  Site?: string[];
  Customers?: string[];
  Admin?: boolean;
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
}

const initialState: UserDataState = {
  isLoading: false,
  user: null,
  lastUpdated: '',
  isOnline: true,
};

export const EMPTY_USER: User = {
  id: '',
  createdTime: '',
  fields: {
    ID: '',
    Password: '',
    Username: '',
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
    deauthenticateAndClearUserData() {
      return { ...initialState };
    }
  },
});

export const { setLoadingForUserData, saveUserData, setIsOnline, deauthenticateAndClearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
