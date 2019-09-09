import { UserProfileSearchParamsDto, UserProfileDto } from '@zorko/dto'
import { AuthAxiosApiClient } from '../auth';
import { UserProfileApiClient } from './user.profile.api.client';

export class UserProfileAxiosApiClient extends AuthAxiosApiClient implements UserProfileApiClient {
  findOne(params: UserProfileSearchParamsDto): Promise<UserProfileDto> {
    return this.http.get(`/user-profiles/${params.id}`);
  }
}

