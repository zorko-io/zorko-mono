import { AuthApiClient } from '../auth';
import { UserApiClient } from '../user';
import { UserProfileApiClient } from '../user-profile';

export interface ApiClientFacade<C> extends AuthApiClient {
   Auth: AuthApiClient,
   User: UserApiClient,
   UserProfile: UserProfileApiClient
   setConfig(C): this;
}
