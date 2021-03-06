import { Map } from 'immutable';
import { authReducer } from './auth';

export function rootReducer(state: Map<string, any> = Map(), action: any) {

  let auth = authReducer(state.get('auth'), action);

  return state.set('auth', auth);
}
