import { createAction } from 'typesafe-actions';
import { TokenDto } from '@zorko/dto';

export const authTokenRefreshRequest = createAction('AUTH_TOKEN_REFRESH_REQUEST');

export const authTokenSet = createAction(
  'AUTH_TOKEN_SET',
  (resolve) => (token: TokenDto) => resolve(token)
);

export const authTokenRefreshFailure = createAction(
  'AUTH_TOKEN_REFRESH_FAILURE',
  (resolve) => (error: Error) => resolve({ error })
);

