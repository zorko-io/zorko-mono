import { Map } from 'immutable';
import { TokenDto } from '@zorko/dto';
import { RequestPresenter } from '../request';
import { AuthTokenPresenter } from './token';
import { AuthState } from './auth.state';
import { AbstractImmutablePresenter } from '../abstract.immutable.presenter';
import { AuthGetters } from './auth.getters';

export class AuthPresenter extends AbstractImmutablePresenter<AuthState> {
  static create(state?: Map<string, any>) {
    let authGetters = AuthGetters.create();
    const request = state ? authGetters.getRequest(state): null;
    const token = state ? authGetters.getToken(state): null;

    if (!state) {
      state = Map({token: Map(), request: Map()})
    }

    return new AuthPresenter(
      state,
      RequestPresenter.create(request),
      AuthTokenPresenter.create(token),
      AuthGetters.create()
    )
  }

  static getDefaults() {
    return Map({
      token: AuthTokenPresenter.getDefaults(),
      request: RequestPresenter.create().toImmutable()
    });
  }

  private token: AuthTokenPresenter;
  private request: RequestPresenter;
  protected getters: AuthGetters;

  constructor(state: Map<string, any>, request: RequestPresenter, token: AuthTokenPresenter, getters: AuthGetters){
   super(state);
   this.token = token;
   this.request = request;
   this.getters = getters;
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
      .set(this.getters.tokenPath, this.token.toImmutable())
      .set(this.getters.requestPath, this.request.toImmutable())
  }
}
