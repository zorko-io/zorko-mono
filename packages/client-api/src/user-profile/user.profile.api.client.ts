import { AuthApiClient } from '../auth';
import { RemoteUserProfileApi } from '@zorko/remote-api';

export interface UserProfileApiClient extends AuthApiClient, RemoteUserProfileApi {}
