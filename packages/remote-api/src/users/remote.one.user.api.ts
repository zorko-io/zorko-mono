import { RemoteOneServiceApi } from '../utils/remote.one.service.api';
import {
  DeleteUserParams,
  ReadUserParams,
  CreateUserParams,
  UpdateUserParams
} from './params';

export interface RemoteOneUserApi extends
  RemoteOneServiceApi<
    CreateUserParams,
    ReadUserParams,
    UpdateUserParams,
    DeleteUserParams
  >
{}
