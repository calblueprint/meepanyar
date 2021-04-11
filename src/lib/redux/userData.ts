import $ from 'jquery';
import { SiteRecord } from '../airtable/interface';
import refreshData from './refreshData';
import { RootState, store } from './store';
import { deauthenticateAndClearUserData, saveSiteUsersData, saveUserData, setIsOnline, setLoadingForUserData } from './userDataSlice';


// TODO: Change from any when typing introduced
export const refreshUserData = async (user: any): Promise<void> => {
  if (!user) {
    return;
  }

  // Log in the user
  store.dispatch(setLoadingForUserData());
  store.dispatch(saveUserData(user));

  try {
    refreshData(false);
  } catch (err) {
    console.log('Error occurred during login: ', err);
  }
};

export const refreshSiteUsersData = (site: SiteRecord): void => {
  store.dispatch(saveSiteUsersData(site.users));
};

//Function is called at a set interval and repulls data from backend 
export const refreshDataBackground = async (): Promise<void> => {
  const state = store.getState();
  if (!state.userData.user) {
    return;
  }
  try {
    if (state.userData.isOnline) {
      refreshData(true);
    }
  } catch (err) {
    console.log('Error occurred pulling data', err);
  }
}

// Function is called at a set interval and updates redux's
// isOnline value depending on if it gets a response from airlock
export const checkOnline = (): void => {
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

export const getUserId = (): string => {
  const state = store.getState();
  let userId = '';

  if (state.userData && state.userData.user) {
    userId = state.userData.user.id;
  }

  return userId;
};

export const selectCurrentUserId = (state: RootState): string => state.userData.user?.id || "";

export const selectCurrentUserIsAdmin = (state: RootState): boolean => state.userData.user?.fields.Admin || false;

export const clearUserData = (): void => {
  store.dispatch(deauthenticateAndClearUserData());
};

