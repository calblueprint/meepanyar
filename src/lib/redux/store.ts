import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { connectRouter, routerMiddleware } from 'connected-react-router';

import userDataSlice from './userDataSlice';
import siteDataSlice from './siteDataSlice';
import customerDataSlice from './customerDataSlice';

const history = createBrowserHistory();

const allReducers = combineReducers({
  userData: userDataSlice,
  siteData: siteDataSlice,
  customerData: customerDataSlice,
  router: connectRouter(history),
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk, logger, routerMiddleware(history)],
});

const persistor = persistStore(store);

export { history, store, persistor };
export type RootState = ReturnType<typeof store.getState>;
