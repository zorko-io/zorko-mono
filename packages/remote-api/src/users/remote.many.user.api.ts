import { RemoteManyServiceApi } from '../utils/remote.many.service.api';
import {
  ReadUserCollectionParams,
  CreateUserCollectionParams,
  UpdateUserCollectionParams,
  DeleteUserCollectionParams
} from './params';
import {
  UserCollection
} from '@zorko/dto';

export interface RemoteManyUserApi extends
  RemoteManyServiceApi<
    CreateUserCollectionParams,
    ReadUserCollectionParams,
    UpdateUserCollectionParams,
    DeleteUserCollectionParams,
    UserCollection
  >
{}
