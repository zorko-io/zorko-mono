import { fromJS, Map } from 'immutable';
import { TokenDto } from '@zorko/dto';

export class AuthPresenter {
  private readonly immutable: Map<string, any>;

  static fromJS(data: any) {
    return new AuthPresenter(fromJS((data)))
  }

  constructor(state: Map<string, any> = Map()){
    this.immutable = state;
  }

  updateToken(token: TokenDto){
    this.immutable.set('token', fromJS(token));
    return this;
  }

  toJS() {
    return this.immutable.toJS()
  }

  toImmutable(){
    return this.immutable;
  }

}
