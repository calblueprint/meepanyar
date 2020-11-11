import { store } from './store';
import { saveUserData, setLoadingForUserData, setIsOnline } from './userDataSlice';
import $ from 'jquery';

// TODO: Change from any when typing introduced
const refreshUserData = (user: any): void => {
  store.dispatch(setLoadingForUserData());
  store.dispatch(saveUserData(user));
};

const checkOnline = () => {
  $.ajax({
    url: 'http://localhost:4000/',
    type: 'GET',
    success: () => store.dispatch(setIsOnline({ isOnline: true })),
    error: () => store.dispatch(setIsOnline({ isOnline: false })),
  });
};

export { refreshUserData, checkOnline };
