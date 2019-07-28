import { AuthApiClient } from '../auth';
import { UserApiClient } from '../user';

export interface ApiClientFacade<C> extends AuthApiClient {
   Auth: AuthApiClient,
   User: UserApiClient,
   setConfig(C): this;
}
