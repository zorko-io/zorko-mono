import { AxiosResponse } from 'axios';
import { AuthAxiosApiClient } from '../../auth';
import { User } from '@zorko/dto';
import { UserOneApiClient } from './user.one.api.client';
import {
  CreateUserParams,
  DeleteUserParams,
  ReadUserParams,
  UpdateUserParams,
} from '@zorko/remote-api';

export class UserAxiosOneApiClient extends AuthAxiosApiClient implements UserOneApiClient  {

  async createOne(params: CreateUserParams): Promise<string> {
    const response: AxiosResponse<string> = await this.http.post(
      '/users',
      params
    );
    return response.data;
  }

  async findOne(params: ReadUserParams): Promise<User> {
    const { id }  = params;
    const response: AxiosResponse<User> = await this.http.get(
      `/users/${id}`
    );
    return response.data;
  }

  async updateOne(params: UpdateUserParams): Promise<User> {
    const response: AxiosResponse<User> = await this.http.put(
      `/users/${params.id}`,
      params
    );
    return response.data;
  }

  async removeOne(deleteParams: DeleteUserParams): Promise<void> {
    const { id } = deleteParams;
    await this.http.delete(`/users/${id}`);
  }
}

