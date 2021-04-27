import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

import { store, persistor } from './lib/redux/store';
import { checkOnline, refreshDataBackground } from './lib/redux/userData';

import './lib/i18next/i18n';

// Check if online every 10 seconds
setInterval(checkOnline, 10000);
//refreshes data in the background every 15 min
setInterval(refreshDataBackground, 900000);

// Set up broadcast channel between the client and service worker
// this channel is used by the service worker to tell the client 
// to refresh site data once all requests have been sent.
const postQueueMonitorChannel = new BroadcastChannel('refresh-data-channel');

postQueueMonitorChannel.onmessage = (event) => {
  if (event.data && event.data.replayQueueLength === 0) {
    console.log("Offline requests finished sending. Refreshing data...")
    refreshDataBackground().then(() => console.log("...Finished refreshing data"))
  }
}


ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
