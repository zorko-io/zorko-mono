import {
  UserProfileDto,
  CreateUserProfileDto,
  UserProfileSearchParamsDto
} from '@zorko/dto';

import {
  RemoteOneServiceApi
} from '../utils/remote.one.service.api';

export interface RemoteOneUserProfileApi extends
  RemoteOneServiceApi<
    UserProfileSearchParamsDto,
    UserProfileDto,
    CreateUserProfileDto
  >
{}
