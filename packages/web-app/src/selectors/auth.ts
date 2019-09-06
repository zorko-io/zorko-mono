import _ from 'lodash';
import { AppPresenter } from '../store/app'
import { AuthTokenPresenter } from '../store/auth/token';
import { AuthGetters } from '../store/auth/auth.getters';

const authGetter = AuthGetters.create();

export const isAuthenticated = _.flow([
  AppPresenter.getAuth,
  authGetter.getToken,
  AuthTokenPresenter.hasAccessKey
]);
