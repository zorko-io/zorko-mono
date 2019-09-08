import _ from 'lodash';
import { AppPresenter } from '../store/app'
import { AuthTokenGetter } from '../store/auth/token';
import { AuthGetter } from '../store/auth/auth.getter';

const authGetter = AuthGetter.create();
const authTokenGetter = AuthTokenGetter.create();

export const isAuthenticated = _.flow([
  AppPresenter.getAuth,
  authGetter.getToken,
  authTokenGetter.hasAccessKey
]);
