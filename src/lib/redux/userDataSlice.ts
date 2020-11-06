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
}

interface User {
  id: string;
  createdTime: string;
  fields: UserFields;
}

interface UserDataState {
  isLoading: boolean;
  user: User | null;
  lastUpdated: string;
}

const initialState: UserDataState = {
  isLoading: false,
  user: null,
  lastUpdated: '',
};

const userDataSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setLoadingForUserData(state) {
      state.isLoading = true;
    },
    saveUserData(state, action) {
      state.user = { ...action.payload };
      state.isLoading = false;
      state.lastUpdated = moment().toString();
    },
  },
});

export const { setLoadingForUserData, saveUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
