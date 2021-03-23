import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
import inventoryDataSlice from './inventoryDataSlice';
import siteDataSlice from './siteDataSlice';
import customerDataSlice from './customerDataSlice';
import userDataSlice from './userDataSlice';


const history = createBrowserHistory();

const allReducers = combineReducers({
  userData: userDataSlice,
  siteData: siteDataSlice,
  customerData: customerDataSlice,
  inventoryData: inventoryDataSlice,
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
