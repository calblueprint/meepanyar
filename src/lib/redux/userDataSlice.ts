/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import moment from 'moment';
import { UserRecord } from '../airtable/interface';
import { RootState } from './store';

// TODO: Think about what data should be stored in here

const usersAdapter = createEntityAdapter<UserRecord>();

// Customized selectors for users
export const {
  selectEntities: selectAllSiteUsersArray,
  selectAll: selectAllSiteUsers,
  selectById: selectSiteUserById,
  selectIds: selectSiteUserIds,
} = usersAdapter.getSelectors((state: RootState) => state.userData.users);

interface UserDataState {
  isLoading: boolean;
  lastUpdated: string;
  isOnline: boolean;
  users: EntityState<UserRecord>;
  currentUserId: string;
}

const initialState: UserDataState = {
  isLoading: false,
  lastUpdated: '',
  isOnline: true,
  users: usersAdapter.getInitialState(),
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
    saveCurrentUserData(state, action) {
      usersAdapter.upsertOne(state.users, action.payload);
      state.isLoading = false;
      state.lastUpdated = moment().toString();
      state.isOnline = true;
    },
    saveUserData(state, action) {
      const userEntities = usersAdapter.upsertMany(state.users, action.payload);
      state.users = userEntities;
    },
    deauthenticateAndClearUserData() {
      return { ...initialState };
    },
  },
});

export const {
  setLoadingForUserData,
  saveCurrentUserData,
  setCurrentUserId,
  setIsOnline,
  saveUserData,
  deauthenticateAndClearUserData,
} = userDataSlice.actions;
export default userDataSlice.reducer;
