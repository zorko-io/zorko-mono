import { TokenDto } from '@zorko/dto';
import { fromJS, Map } from 'immutable';
import { AbstractImmutablePresenter } from '../../abstract.immutable.presenter';

export interface AuthTokenState extends TokenDto{}

export class AuthTokenPresenter extends AbstractImmutablePresenter<AuthTokenState>{

  static getDefaults() {
    return fromJS({
      accessKey: '',
      userId: ''
    })
  }

  static hasToken(token: Map<string, any>){
    return Boolean(token.get('accessKey'));
  }

  static create(state?: Map<string, any>) {
    return new AuthTokenPresenter(state || AuthTokenPresenter.getDefaults())
  }

  hasToken(){
    return Boolean(this.immutable.get('accessKey'));
  }

  setAccessKey (value: string) {
    return this.addMutation(
      (mutation: Map<string, any>) => mutation.set('accessKey', value)
    );
  }

  setUserId (value: string) {
    return this.addMutation(
      (mutation: Map<string, any>) => mutation.set('userId', value)
    );
  }

  update(token: TokenDto){
    this.immutable = fromJS(token);
    return this;
  }

  asJS(): AuthTokenState {
     return  this.immutable.toJS() as AuthTokenState
   }
}
