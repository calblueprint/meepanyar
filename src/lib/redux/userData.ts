import { store } from './store';
import { saveUserData, setLoadingForUserData } from './userDataSlice';

// TODO: Change from any when typing introduced
const refreshUserData = (user: any): void => {
  store.dispatch(setLoadingForUserData());
  store.dispatch(saveUserData(user));
};

export { refreshUserData };
