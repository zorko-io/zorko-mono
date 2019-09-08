import { Getter } from '../../presenter';
import { Map } from 'immutable';

export class AuthTokenGetter implements Getter {
  readonly userIdPath: string;
  readonly accessKeyPath: string;

  static create() {
    return new AuthTokenGetter();
  }

  constructor() {
    this.accessKeyPath = 'accessKey';
    this.userIdPath = 'userId';
  }

  hasAccessKey = (state: Map<string, any>): boolean => {
    return Boolean(state.get(this.accessKeyPath));
  };

  getUserId = (state: Map<string, any>): string => {
    return state.get(this.userIdPath);
  };
}
