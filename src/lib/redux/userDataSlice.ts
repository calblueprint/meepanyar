/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// TODO: Think about what data should be stored in here
const initialState = {
  isLoading: false,
  user: null,
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
    },
  },
});

export const { setLoadingForUserData, saveUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
