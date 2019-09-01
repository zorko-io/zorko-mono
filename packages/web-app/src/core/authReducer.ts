import { fromJS, Map } from 'immutable';

export function authReducer(state: Map<string, any> = Map(), action: any) {

  switch (action.type) {
    case 'AUTH_TOKEN_SET': {
      return state.set('token', fromJS({
        accessToken : 'dsdsddsdsd'
      }))
    }
    default:
      return state
  }
}
