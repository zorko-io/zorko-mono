import { TokenDto } from '@zorko/dto';
import { Presenter } from '../../presenter';
import { fromJS, Map } from 'immutable';

export interface AuthTokenState extends TokenDto{}

export class AuthTokenPresenter implements Presenter<AuthTokenState>{
  private immutable: Map<string, any>;

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
    return  AuthTokenPresenter.hasToken(this.immutable);
  }

  constructor(state: Map<string, any>) {
     this.immutable = state;
  }

  update(token: TokenDto){
    this.immutable = fromJS(token);
    return this;
  }

  toJS(): AuthTokenState {
     return  this.immutable.toJS() as AuthTokenState
   }

   toImmutable(): Map<string, any> {
     return this.immutable;
   }
}
