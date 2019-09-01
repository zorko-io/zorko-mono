import { createAction } from 'typesafe-actions';
import { TokenDto } from '@zorko/dto';


export const authTokenSet = createAction(
  'AUTH_TOKEN_SET',
  (resolve) => (token: TokenDto) => resolve(token)
);
