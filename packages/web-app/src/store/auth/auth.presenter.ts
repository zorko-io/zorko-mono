import { fromJS, Map } from 'immutable';
import { TokenDto } from '@zorko/dto';
import { RequestPresenter, RequestState } from '../request';

export interface AuthState {
  readonly token: TokenDto
  readonly request: RequestState
}

export class AuthPresenter {
  private immutable: Map<string, any>;

  static create(state?: Map<string, any>) {
    return new AuthPresenter(state)
  }

  static getDefaults() {
    return Map({
      token: null,
      request: RequestPresenter.create().toImmutable()
    });
  }

  static hasToken(auth: Map<string, any>): boolean {

    // todo check just token existence
    return Boolean(auth.get('token'))
  }

  static getToken(auth: Map<string, any>){
    return auth.get('token')
  }

  static getRequest(auth: Map<string, any>){
    return auth.get('request')
  }

  constructor(state?: Map<string, any>){
    if (!state){
      state = AuthPresenter.getDefaults()
    }

    /// TODO: validation !!???

    this.immutable = state;
  }

  get request() {
    return AuthPresenter.getRequest(this.immutable);
  }

  set request (request){
    this.immutable = this.immutable.set('request', request);
  }

  get token() {
    return AuthPresenter.getToken(this.immutable);
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

  failRefresh(error: Error) {
    this.request = RequestPresenter
      .create(this.request)
      .markFailure(error)
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
