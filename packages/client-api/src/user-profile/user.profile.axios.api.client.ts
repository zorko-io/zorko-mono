import { AxiosResponse } from 'axios';
import { UserProfileSearchParamsDto, UserProfileDto } from '@zorko/dto'
import { AuthAxiosApiClient } from '../auth';
import { UserProfileApiClient } from './user.profile.api.client';

export class UserProfileAxiosApiClient extends AuthAxiosApiClient implements UserProfileApiClient {
  async findOne(params: UserProfileSearchParamsDto): Promise<UserProfileDto> {
    let response: AxiosResponse<UserProfileDto> = await this.http.get(
      `/user-profiles/${params.id}`
    );
    return response.data;
  }
}

