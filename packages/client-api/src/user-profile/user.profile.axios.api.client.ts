import { AxiosResponse } from 'axios';
import {
  UserProfileSearchParamsDto,
  UserProfileDto,
  CreateUserProfileDto
} from '@zorko/dto';
import { AuthAxiosApiClient } from '../auth';
import { UserProfileApiClient } from './user.profile.api.client';

export class UserProfileAxiosApiClient extends AuthAxiosApiClient implements UserProfileApiClient {

  async findOne(params: UserProfileSearchParamsDto): Promise<UserProfileDto> {
    let response: AxiosResponse<UserProfileDto> = await this.http.get(
      `/user-profiles/${params.login}`
    );
    return response.data;
  }

  async createOne(params: CreateUserProfileDto): Promise<string> {
    let response: AxiosResponse<string> = await this.http.post(
      `/user-profiles`, params

    );
    return response.data;
  }
}

