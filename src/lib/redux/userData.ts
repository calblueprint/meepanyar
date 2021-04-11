import $ from 'jquery';
import { createSelector } from 'reselect';
import { fromAirtableFormat } from '../airtable/airtable';
import { SiteRecord, UserRecord } from '../airtable/interface';
import { Tables } from '../airtable/schema';
import refreshData from './refreshData';
import { RootState, store } from './store';
import { deauthenticateAndClearUserData, saveSiteUsersData, saveUserData, selectSiteUserById, setCurrentUserId, setIsOnline, setLoadingForUserData } from './userDataSlice';


// TODO: Change from any when typing introduced
export const refreshUserData = async (user: any): Promise<void> => {
  if (!user) {
    return;
  }
  const formattedUser : UserRecord = fromAirtableFormat(user.fields, Tables.Users) as UserRecord;

  store.dispatch(setLoadingForUserData());
  // Log in the user
  store.dispatch(setCurrentUserId(formattedUser.id));
  store.dispatch(saveUserData(formattedUser));

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
  if (!state.userData.currentUserId) {
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

export const selectCurrentUserId = (state: RootState): string => state.userData.currentUserId;

export const selectCurrentUser = createSelector(selectCurrentUserId, store.getState , (currentUserId, state) => selectSiteUserById(state, currentUserId));

export const selectCurrentUserIsAdmin = createSelector(selectCurrentUser, (currentUser) => currentUser?.admin || false);

export const clearUserData = (): void => {
  store.dispatch(deauthenticateAndClearUserData());
};

