import { createStore as createReduxStore, applyMiddleware, compose, StoreEnhancer } from 'redux';
import { createLogger } from 'redux-logger';

import { rootReducer } from './rootReducer';

const reduxDevToolsEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

const composeEnhancers =
  process.env.NODE_ENV === 'development' && reduxDevToolsEnhancer ? reduxDevToolsEnhancer : compose;

const middleware = [
  createLogger()
];

const enhancer: StoreEnhancer<any> = composeEnhancers(applyMiddleware(...middleware));


export function createStore() {
  return createReduxStore(rootReducer, {}, enhancer)
}
