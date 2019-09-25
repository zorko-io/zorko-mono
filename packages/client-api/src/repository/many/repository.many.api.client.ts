import { RemoteManyRepositoryApi } from '@zorko/remote-api';
import { AuthApiClient } from '../../auth';

export interface RepositoryManyApiClient extends AuthApiClient, RemoteManyRepositoryApi {}
