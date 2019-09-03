import { AuthPresenter } from './auth.presenter';
import { authReducer } from './auth.reducer';
import {
  authTokenRefreshFailure,
  authTokenRefreshRequest,
  authTokenSet
} from './auth.actions';

describe('AuthReducer', () => {

  it('starts auth refresh', () => {
    let actual = authReducer(undefined, authTokenRefreshRequest());
    let expected = AuthPresenter.create().startRefresh().toImmutable();

    expect(actual.toJS()).toEqual(expected.toJS())
  });

  it('updates token', () => {
    let nextToken = {
      accessKey: '3939393939',
      userId: 'dsdsdsdsdsd'
    };
    let actual = authReducer(AuthPresenter.create().toImmutable(), authTokenSet(nextToken));
    let expected = AuthPresenter.create().updateToken(nextToken).toImmutable();

    expect(actual.toJS()).toEqual(expected.toJS())
  });

  it('marks failure refresh', () => {
    let error = new Error('Boom!!');
    let actual = authReducer(AuthPresenter.create().toImmutable(), authTokenRefreshFailure(error));
    let expected = AuthPresenter.create().failRefresh(error).toImmutable();

    expect(actual.toJS()).toEqual(expected.toJS());
  })


});
