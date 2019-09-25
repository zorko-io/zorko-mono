
import {
  RemoteOneServiceApi
} from '../../utils/remote.one.service.api';
import {
  CreateUserProfileParams
} from './params/create.user.profile.params';
import { ReadUserProfileParams } from './params/read.user.profile.params';
import { UpdateUserProfileParams } from './params/update.user.profile.params';
import { DeleteUserCollectionParams } from '../../users';

export interface RemoteOneUserProfileApi extends
  RemoteOneServiceApi<
    CreateUserProfileParams,
    ReadUserProfileParams,
    UpdateUserProfileParams,
    DeleteUserCollectionParams,
    any
    >
{}
