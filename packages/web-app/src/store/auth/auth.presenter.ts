import { Map } from 'immutable';
import { TokenDto } from '@zorko/dto';
import { RequestPresenter } from '../request';
import { AuthTokenPresenter } from './token';
import { AuthState } from './auth.state';
import { AbstractImmutablePresenter } from '../abstract.immutable.presenter';

export class AuthPresenter extends AbstractImmutablePresenter<AuthState> {
  static create(state?: Map<string, any>) {
    const request = state ? AuthPresenter.getRequest(state): null;
    const token = state ? AuthPresenter.getToken(state): null;

    if (!state) {
      state = Map({token: Map(), request: Map()})
    }

    return new AuthPresenter(
      state,
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

  static getToken(auth: Map<string, any>){
    return auth.get('token')
  }

  static getRequest(auth: Map<string, any>){
    return auth.get('request')
  }

  private token: AuthTokenPresenter;
  private request: RequestPresenter;

  constructor(state: Map<string, any>, request: RequestPresenter, token: AuthTokenPresenter){
   super(state);
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

  refreshToken(nextToken: TokenDto){
    this.request.setSucceed(true);
    this.token
      .setAccessKey(nextToken.accessKey)
      .setUserId(nextToken.userId);

    return this;
  }

  asJS(): AuthState {
    return {
      token: this.token.toJS(),
      request: this.request.toJS()
    }
  }

  asImmutable() : Map<string, any> {
    return Map({token: Map(), request: Map()})
      .set('token', this.token.toImmutable())
      .set('request', this.request.toImmutable())
  }
}
