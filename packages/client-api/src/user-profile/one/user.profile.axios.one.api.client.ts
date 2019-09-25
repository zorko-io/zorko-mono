import { AxiosResponse } from 'axios';
import {
  UserProfileDto,
} from '@zorko/dto';
import { AuthAxiosApiClient } from '../../auth';
import { UserProfileOneApiClient } from './user.profile.one.api.client';
import {
  CreateUserProfileParams,
  DeleteUserCollectionParams,
  ReadUserProfileParams,
  UpdateUserProfileParams,
} from '@zorko/remote-api';

export class UserProfileAxiosOneApiClient extends AuthAxiosApiClient implements UserProfileOneApiClient {

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

