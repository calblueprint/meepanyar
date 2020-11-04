import { store } from './store';
import { saveUserData, setLoadingForUserData } from './userDataSlice';

// TODO: Change from ANY type to user schema after Maria's schema PR gets merged
const refreshUserData = (user: any): void => {
  store.dispatch(setLoadingForUserData());
  store.dispatch(saveUserData(user));
};

export { refreshUserData };
