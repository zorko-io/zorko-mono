import { Map } from 'immutable';
import { TokenDto } from '@zorko/dto';
import { RequestPresenter } from '../request';
import { AuthTokenPresenter } from './token';
import { AuthState } from './auth.state';
import { AbstractImmutablePresenter } from '../abstract.immutable.presenter';
import { AuthGetter } from './auth.getter';

export class AuthPresenter extends AbstractImmutablePresenter<AuthState, AuthGetter> {
  static create(state?: Map<string, any>) {
    let authGetters = AuthGetter.create();
    const request = state ? authGetters.getRequest(state): null;
    const token = state ? authGetters.getToken(state): null;

    if (!state) {
      state = Map({token: Map(), request: Map()})
    }

    return new AuthPresenter(
      state,
      RequestPresenter.create(request),
      AuthTokenPresenter.create(token),
      AuthGetter.create()
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

  constructor(state: Map<string, any>, request: RequestPresenter, token: AuthTokenPresenter, getter: AuthGetter){
   super(state, getter);
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
      .set(this.getter.tokenPath, this.token.toImmutable())
      .set(this.getter.requestPath, this.request.toImmutable())
  }
}
