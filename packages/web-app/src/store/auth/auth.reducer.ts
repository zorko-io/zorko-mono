import { fromJS, Map } from 'immutable';
import { getType } from 'typesafe-actions';
import {
  authTokenRefreshRequest,
  authTokenSet,
  authTokenRefreshFailure
} from './auth.actions';
import { AuthPresenter } from './auth.presenter';

const initialState = AuthPresenter.getDefaults();

export function authReducer(state: Map<string, any> = initialState, action: any) {
  switch (action.type) {
    case getType(authTokenRefreshRequest): {
      return AuthPresenter
        .create(state)
        .startRefresh()
        .toImmutable();
    }
    case getType(authTokenSet): {
      return AuthPresenter
        .create(state)
        .updateToken(action.payload)
        .toImmutable();
    }
    case getType(authTokenRefreshFailure): {
      return AuthPresenter
        .create(state)
        .failRefresh(action.payload.error)
        .toImmutable();
    }
    default:
      return state
  }
}
