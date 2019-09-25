import { AuthApiClient } from '../../auth';
import { RemoteManyUserApi } from '@zorko/remote-api';

export interface UserManyApiClient extends AuthApiClient, RemoteManyUserApi {}
