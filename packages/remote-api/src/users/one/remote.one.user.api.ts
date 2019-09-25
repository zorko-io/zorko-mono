import { RemoteOneServiceApi } from '../../utils/remote.one.service.api';
import {
  DeleteUserParams,
  ReadUserParams,
  CreateUserParams,
  UpdateUserParams
} from '../params';
import { User } from '@zorko/dto';

export interface RemoteOneUserApi extends
  RemoteOneServiceApi<
    CreateUserParams,
    ReadUserParams,
    UpdateUserParams,
    DeleteUserParams,
    User
  >
{}
