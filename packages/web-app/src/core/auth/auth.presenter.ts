import { fromJS, Map } from 'immutable';
import { TokenDto } from '@zorko/dto';
import { RequestPresenter, RequestState } from '../request';

export interface AuthState {
  readonly token: TokenDto
  readonly request: RequestState
}

export class AuthPresenter {
  private immutable: Map<string, any>;

  static create(state?: RequestState) {
    return new AuthPresenter(state ? fromJS(state) : state)
  }

  constructor(state?: Map<string, any>){
    if (!state){
      state = Map({
        token: null,
        request: RequestPresenter.create().toImmutable()
      })
    }

    /// TODO: validation !!???

    this.immutable = state;
  }

  get request() {
    return this.immutable.get('request');
  }

  set request (request){
    this.immutable = this.immutable.set('request', request);
  }

  get token() {
    return this.immutable.get('token');
  }

  set token (token){
    this.immutable = this.immutable.set('token', token);
  }

  startRefresh() {
    this.request = RequestPresenter
      .create(this.request)
      .startRequest()
      .toImmutable();

    return this;
  }

  updateToken(nextToken: TokenDto){
    this.request = RequestPresenter
      .create(this.request)
      .markSucceed()
      .toImmutable();
    this.token = fromJS(nextToken);
    return this;
  }

  toJS(): AuthState {
    return this.immutable.toJS() as AuthState;
  }

  toImmutable(){
    return this.immutable;
  }
}
