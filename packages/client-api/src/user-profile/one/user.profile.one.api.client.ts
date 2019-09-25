import { AuthApiClient } from '../../auth';
import { RemoteOneUserProfileApi } from '@zorko/remote-api';

export interface UserProfileOneApiClient extends AuthApiClient, RemoteOneUserProfileApi {}
