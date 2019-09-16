import { RemoteOneServiceApi } from '../utils/remote.one.service.api';
import { DeleteUserParams } from './delete.user.params';
import { ReadUserParams } from './read.user.params';
import { CreateUserParams } from './create.user.params';
import { UpdateUserParams } from './update.user.params';

export interface RemoteOneUserApi extends
  RemoteOneServiceApi<
    CreateUserParams,
    ReadUserParams,
    UpdateUserParams,
    DeleteUserParams
  >
{}
