import { Map } from 'immutable';
import { AuthTokenGetter } from './auth.token.getter';

describe('AuthTokenGetter', () => {
  let getter: AuthTokenGetter;

  beforeEach(() => {
    getter = AuthTokenGetter.create();
  });

  it('has no access key ', () => {
    expect(getter.hasAccessKey(Map({
      accessKey: '',
    }))).toBeFalsy();
  });

  it('has access key', () => {
    expect(getter.hasAccessKey(Map({
      accessKey: '4343423424',
    }))).toBeTruthy();
  });

  it('gets user id', () => {
    expect(getter.getUserId(Map({
      userId: '2223',
    }))).toEqual('2223');
  });

  it('gets empty user id', () => {
    expect(getter.getUserId(Map({
      userId: '',
    }))).toEqual('');
  });

});


