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

  async createOne(user: CreateUserParams): Promise<string> {
    const response: AxiosResponse<string> = await this.http.post('/users', user);
    return response.data;
  }

  async findOne(readParams: ReadUserParams): Promise<User> {
    const { id }  = readParams;
    const response: AxiosResponse<User> = await this.http.get(`/users/${id}`);
    return response.data;
  }

  async removeOne(deleteParams: DeleteUserParams): Promise<void> {
    const { id } = deleteParams;
    await this.http.delete(`/users/${id}`);
  }

  updateOne(updateParams: UpdateUserParams): Promise<User> {
    return undefined;
  }
}

