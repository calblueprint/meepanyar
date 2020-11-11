import { store } from './store';
import { saveUserData, setLoadingForUserData, setIsOnline } from './userDataSlice';
import $ from 'jquery';

// TODO: Change from any when typing introduced
const refreshUserData = (user: any): void => {
  store.dispatch(setLoadingForUserData());
  store.dispatch(saveUserData(user));
};

// Function is called at a set interval and updates redux's
// isOnline value depending on if it gets a response from airlock
const checkOnline = (): void => {
  $.ajax({
    url: process.env.REACT_APP_AIRTABLE_ENDPOINT_URL,
    type: 'GET',
    success: () => store.dispatch(setIsOnline({ isOnline: true })),
    error: () => store.dispatch(setIsOnline({ isOnline: false })),
  });
};

export { refreshUserData, checkOnline };
