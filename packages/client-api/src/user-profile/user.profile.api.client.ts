import { AuthApiClient } from '../auth';
import { RemoteOneUserProfileApi } from '@zorko/remote-api';

export interface UserProfileApiClient extends AuthApiClient, RemoteOneUserProfileApi {}
