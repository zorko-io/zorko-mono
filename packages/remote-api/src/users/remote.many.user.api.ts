import { RemoteManyServiceApi } from '../utils/remote.many.service.api';
import {
  ReadUserCollectionParams,
  CreateUserCollectionParams,
  UpdateUserCollectionParams,
  DeleteUserCollectionParams
} from './params';

export interface RemoteManyUserApi extends
  RemoteManyServiceApi<
    CreateUserCollectionParams,
    ReadUserCollectionParams,
    UpdateUserCollectionParams,
    DeleteUserCollectionParams
  >
{}
