import { RemoteManyServiceApi } from '../utils/remote.many.service.api';
import { ReadUserCollectionParams } from './read.user.collection.params';
import { CreateUserCollectionParams } from './create.user.collection.params';
import { UpdateUserCollectionParams } from './update.user.collection.params';
import { DeleteUserCollectionParams } from './delete.user.collection.params';

export interface RemoteManyUserApi extends
  RemoteManyServiceApi<
    CreateUserCollectionParams,
    ReadUserCollectionParams,
    UpdateUserCollectionParams,
    DeleteUserCollectionParams
  >
{}
