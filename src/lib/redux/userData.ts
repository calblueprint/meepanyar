import $ from 'jquery';
import { refreshSiteData } from './siteData';
import { RootState, store } from './store';
import { deauthenticateAndClearUserData, saveUserData, setIsOnline, setLoadingForUserData } from './userDataSlice';


// TODO: Change from any when typing introduced
const refreshUserData = async (user: any): Promise<void> => {
  if (!user) {
    return;
  }

  // Log in the user
  store.dispatch(setLoadingForUserData());
  store.dispatch(saveUserData(user));

  try {
    refreshSiteData(false);
  } catch (err) {
    console.log('Error occurred during login: ', err);
  }
};

//Function is called at a set interval and repulls data from backend 
const refreshDataBackground = async (): Promise<void> => {
  const state = store.getState();
  if (!state.userData.user) {
    return;
  }
  try {
    if (state.userData.isOnline) {
      refreshSiteData(true);
    }
  } catch (err) {
    console.log('Error occurred pulling data', err);
  }
}

// Function is called at a set interval and updates redux's
// isOnline value depending on if it gets a response from airlock
const checkOnline = (): void => {
  $.ajax({
    url: process.env.REACT_APP_AIRTABLE_ENDPOINT_URL,
    type: 'GET',
    success: () => {
      //check if the prior state was offline, if state changes from offline -> online, reload data
      const state = store.getState();
      if (!state.userData.isOnline) {
        //refresh data code here
        refreshDataBackground();
      }
      store.dispatch(setIsOnline({ isOnline: true }))

    }
    ,
    error: () => store.dispatch(setIsOnline({ isOnline: false })),
  });
};

const getUserId = (): string => {
  const state = store.getState();
  let userId = '';

  if (state.userData && state.userData.user) {
    userId = state.userData.user.id;
  }

  return userId;
};

export const userIdSelector = (state: RootState) => state.userData.user?.id;

export const clearUserData = (): void => {
  store.dispatch(deauthenticateAndClearUserData());
};

export { refreshUserData, checkOnline, getUserId, refreshDataBackground };
