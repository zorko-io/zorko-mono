import { AuthApiClient } from '../auth';
import { UserApiClient } from '../user';
import { UserProfileApiClient } from '../user-profile';
import {
  RepositoryManyApiClient,
  RepositoryOneApiClient
} from '../repository';

export interface ApiClientFacade<C> extends AuthApiClient {
   Auth: AuthApiClient,
   User: UserApiClient,
   UserProfile: UserProfileApiClient,
   Repositories: RepositoryManyApiClient,
   Repository: RepositoryOneApiClient
   setConfig(C): this;
}
