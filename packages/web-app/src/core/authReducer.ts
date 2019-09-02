import { fromJS, Map } from 'immutable';
import { getType } from 'typesafe-actions';
import {
  authTokenRefreshRequest,
  authTokenSet,
  authTokenRefreshFailure
} from './auth.actions';

export function authReducer(state: Map<string, any> = Map(), action: any) {
  switch (action.type) {
    case getType(authTokenRefreshRequest):{
      return state.set('request', fromJS({
         isPending: true,
         isSucceed: false,
         error: null
      }))
    }
    case getType(authTokenSet): {
      return state
        .set('token', fromJS(action.payload))
        .set('request', fromJS({
          isPending: true,
          isSucceed: false,
          error: null
        }))
    }
    case getType(authTokenRefreshFailure): {
      return state
        .set('request', fromJS({
          isPending: false,
          isSucceed: false,
          error: action.payload.error
        }))
    }
    default:
      return state
  }
}
