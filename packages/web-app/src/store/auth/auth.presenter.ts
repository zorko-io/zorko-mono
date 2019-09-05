import { Map } from 'immutable';
import { TokenDto } from '@zorko/dto';
import { RequestPresenter, RequestState } from '../request';
import { AuthTokenPresenter } from './token/auth.token.presenter';

export interface AuthState {
  readonly token: TokenDto
  readonly request: RequestState
}

export class AuthPresenter {
  static create(state?: Map<string, any>) {
    const request = state ? AuthPresenter.getRequest(state): null;
    const token = state ? AuthPresenter.getToken(state): null;

    return new AuthPresenter(
      RequestPresenter.create(request),
      AuthTokenPresenter.create(token)
    )
  }

  static getDefaults() {
    return Map({
      token: AuthTokenPresenter.getDefaults(),
      request: RequestPresenter.create().toImmutable()
    });
  }

  static hasToken(auth: Map<string, any>): boolean {
    return Boolean(auth.get('token'))
  }

  static getToken(auth: Map<string, any>){
    return auth.get('token')
  }

  static getRequest(auth: Map<string, any>){
    return auth.get('request')
  }

  private token: AuthTokenPresenter;
  private request: RequestPresenter;

  constructor(request: RequestPresenter, token: AuthTokenPresenter){
   this.token = token;
   this.request = request;
  }

  startRefresh() {
    this.request.setPending(true);
    return this;
  }

  failRefresh(error: Error) {
    this.request.setError(error);
    return this;
  }

  updateToken(nextToken: TokenDto){
    this.request.setSucceed(true);
    this.token.update(nextToken);
    return this;
  }

  toJS(): AuthState {
    return {
      token: this.token.toJS(),
      request: this.request.toJS()
    }
  }

  toImmutable() : Map<string, any> {
    return Map({token: Map(), request: Map()})
      .set('token', this.token.toImmutable())
      .set('request', this.request.toImmutable())
  }
}
