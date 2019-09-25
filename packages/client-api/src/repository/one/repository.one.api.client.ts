import { AuthApiClient } from '../../auth';
import { RemoteOneRepositoryApi } from '@zorko/remote-api';

export interface RepositoryOneApiClient extends AuthApiClient, RemoteOneRepositoryApi {}
