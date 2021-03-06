import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import Api from '@zorko/client-api';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from './store';

Api.setConfig({
  baseURL: process.env.REACT_APP_SEVER_API_URL
});

if (process.env.NODE_ENV === 'development'){
  // @ts-ignore
  window.__ZORKO_API__ = Api;
}

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
