import { store } from './store';
import { saveUserData, setLoadingForUserData } from './userDataSlice';
import { refreshSiteData } from './siteData';

// TODO: Change from any when typing introduced
const refreshUserData = async (user: any): Promise<void> => {
  if (!user) {
    return;
  }

  // Log in the user
  store.dispatch(setLoadingForUserData());
  store.dispatch(saveUserData(user));

  try {
    refreshSiteData(user);
  } catch (err) {
    console.log('Error occurred during login: ', err);
  }
};

export { refreshUserData };
