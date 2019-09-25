import { AuthApiClient } from '../../auth';
import { RemoteOneUserApi } from '@zorko/remote-api';

export interface UserOneApiClient extends AuthApiClient, RemoteOneUserApi {}
