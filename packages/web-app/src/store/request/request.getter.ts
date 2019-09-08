import { Getter } from '../presenter';
import { Map } from 'immutable';

export class RequestGetter implements Getter {
  static create(){
    return new RequestGetter();
  }

  readonly isPendingPath: string;
  readonly isSucceedPath: string;
  readonly errorPath: string;

  constructor() {
    this.isPendingPath = 'isPending';
    this.isSucceedPath = 'isSucceed';
    this.errorPath = 'error';
  }

  isPending = (state: Map<string, any>) =>  {
    return state.get(this.isPendingPath);
  };

  isSucceed = (state: Map<string, any>) => {
    return state.get(this.isSucceedPath);
  };

  getError = (state: Map<string, any>) => {
    return state.get(this.errorPath);
  };
}
