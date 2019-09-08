import { Map } from 'immutable';

export class AuthGetter  {

  static create() {
    return new AuthGetter();
  }

  readonly tokenPath: string;
  readonly requestPath: string;

  constructor(){
    this.tokenPath = 'token';
    this.requestPath = 'request';
  }

  getToken = (state: Map<string, any>) => {
    return state.get(this.tokenPath);
  };

  getRequest =(state: Map<string, any>) => {
    return state.get(this.requestPath);
  }
}
