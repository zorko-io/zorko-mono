import {
  UserProfileDto,
} from '@zorko/dto';

import {
  RemoteOneServiceApi
} from '../utils/remote.one.service.api';
import {
  CreateUserProfileParams
} from './create.user.profile.params';
import { ReadUserProfileParams } from './read.user.profile.params';
import { UpdateUserProfileParams } from './update.user.profile.params';
import { DeleteUserCollectionParams } from '../users';

export interface RemoteOneUserProfileApi extends
  RemoteOneServiceApi<
    CreateUserProfileParams,
    ReadUserProfileParams,
    UpdateUserProfileParams,
    DeleteUserCollectionParams,
    UserCollection
    >
{}
