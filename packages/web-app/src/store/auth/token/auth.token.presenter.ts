import { TokenDto } from '@zorko/dto';
import { Presenter } from '../../presenter';
import { fromJS, Map } from 'immutable';

export interface AuthTokenState extends TokenDto{}

export class AuthTokenPresenter implements Presenter<AuthTokenState>{
  private immutable: Map<string, any>;

  static getDefaults() {
    return fromJS({
      token: null
    })
  }

  static hasToken(token: Map<string, any>){
    return Boolean(token.get('token'));
  }

  static create(state?: Map<string, any>) {
    return new AuthTokenPresenter(state || AuthTokenPresenter.getDefaults())
  }

  constructor(state: Map<string, any>) {
     this.immutable = state;
  }

  hasToken():boolean{
     return AuthTokenPresenter.hasToken(this.immutable);
  }

  update(token: TokenDto){
    this.immutable = fromJS(token);
    return this;
  }

  toJS(): AuthTokenState {
     return  this.immutable.toJS() as AuthTokenState
   }

   toImmutable() {
     return this.immutable;
   }
}
