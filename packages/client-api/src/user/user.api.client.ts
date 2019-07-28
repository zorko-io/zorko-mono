import { AuthApiClient } from '../auth';
import { RemoteUserApi } from '@zorko/remote-api';

export interface UserApiClient extends AuthApiClient, RemoteUserApi {}
