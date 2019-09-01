import { fromJS, Map } from 'immutable';
import { getType } from 'typesafe-actions';
import { authTokenSet } from './auth.actions';

export function authReducer(state: Map<string, any> = Map(), action: any) {

  switch (action.type) {
    case getType(authTokenSet): {
      return state.set('token', fromJS(action.payload))
    }
    default:
      return state
  }
}
