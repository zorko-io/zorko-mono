import { Map } from 'immutable';

export class AuthGetters  {

  static create() {
    return new AuthGetters();
  }

  readonly tokenPath: string;
  readonly requestPath: string;

  constructor(){
    this.tokenPath = 'token';
    this.requestPath = 'request';
  }

  getToken(state: Map<string, any>){
    return state.get(this.tokenPath);
  }

  getRequest(state: Map<string, any>){
    return state.get(this.requestPath);
  }
}
