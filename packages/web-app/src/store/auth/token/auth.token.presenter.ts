import { TokenDto } from '@zorko/dto';
import { fromJS, Map } from 'immutable';
import { AbstractImmutablePresenter } from '../../abstract.immutable.presenter';
import { AuthTokenState } from './auth.token.state';
import { AuthTokenGetter } from './auth.token.getter';

export class AuthTokenPresenter extends AbstractImmutablePresenter<AuthTokenState, AuthTokenGetter>{
  static getDefaults() {
    return fromJS({
      accessKey: '',
      userId: ''
    })
  }

  static create(state?: Map<string, any>) {
    const getter = new AuthTokenGetter();

    return new AuthTokenPresenter(
      state || AuthTokenPresenter.getDefaults(),
      getter
    )
  }

  setAccessKey (value: string) {
    return this.addMutation(
      (mutation: Map<string, any>) =>
        mutation.set(this.getter.accessKeyPath, value)
    );
  }

  setUserId (value: string) {
    return this.addMutation(
      (mutation: Map<string, any>) =>
        mutation.set(this.getter.userIdPath, value)
    );
  }

  update(token: TokenDto){
    this.immutable = fromJS(token);
    return this;
  }

  asJS(): AuthTokenState {
     return this.immutable.toJS() as AuthTokenState
   }
}
