import { AxiosResponse } from 'axios';
import {
  UserProfileDto,
} from '@zorko/dto';
import { AuthAxiosApiClient } from '../auth';
import { UserProfileApiClient } from './user.profile.api.client';
import {
  CreateUserProfileParams,
  DeleteUserCollectionParams,
  ReadUserProfileParams,
  UpdateUserProfileParams,
} from '@zorko/remote-api';

export class UserProfileAxiosApiClient extends AuthAxiosApiClient implements UserProfileApiClient {

  async findOne(params: ReadUserProfileParams): Promise<UserProfileDto> {
    let response: AxiosResponse<UserProfileDto> = await this.http.get(
      `/user-profiles/${params.login}`
    );
    return response.data;
  }

  async createOne(params: CreateUserProfileParams): Promise<string> {
    let response: AxiosResponse<string> = await this.http.post(
      `/user-profiles`, params

    );
    return response.data;
  }

  removeOne(deleteParams: DeleteUserCollectionParams): Promise<void> {
    return undefined;
  }

  updateOne(updateParams: UpdateUserProfileParams): Promise<ReadUserProfileParams> {
    return undefined;
  }
}

