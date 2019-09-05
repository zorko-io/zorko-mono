import _ from 'lodash';
import { AppPresenter } from '../store/app'
import { AuthPresenter } from '../store/auth';
import { AuthTokenPresenter } from '../store/auth/token';

export const isAuthenticated = _.flow([
  AppPresenter.getAuth,
  AuthPresenter.getToken,
  AuthTokenPresenter.hasAccessKey
]);
