import { AxiosResponse } from 'axios';
import { AuthAxiosApiClient } from '../auth';
import { User, UserCollection } from '@zorko/dto';
import { UserApiClient } from './user.api.client';
import {
  CreateUserCollectionParams,
  CreateUserParams,
  DeleteUserCollectionParams,
  DeleteUserParams,
  ReadUserCollectionParams,
  ReadUserParams,
  UpdateUserCollectionParams,
  UpdateUserParams,
} from '@zorko/remote-api';

export class UserAxiosApiClient extends AuthAxiosApiClient implements UserApiClient  {

  async findMany(readParams?: ReadUserCollectionParams): Promise<UserCollection> {
    const response: AxiosResponse<UserCollection> = await this.http.get('/users');
    return response.data
  }

  async createOne(user: CreateUserParams): Promise<string> {
    const response: AxiosResponse<string> = await this.http.post('/users', user);
    return response.data;
  }

  async findOne(readParams: ReadUserParams): Promise<User> {
    const { id }  = readParams;
    const response: AxiosResponse<User> = await this.http.get(`/users/${id}`);
    return response.data;
  }

  async createMany(createParams: CreateUserCollectionParams): Promise<string[]> {
    return ['123']
  }

  async removeMany(deleteParams: DeleteUserCollectionParams): Promise<number> {
    const response: AxiosResponse<number> = await this.http.delete('/users');
    return response.data
  }

  async removeOne(deleteParams: DeleteUserParams): Promise<void> {
    const { id } = deleteParams;
    await this.http.delete(`/users/${id}`);
  }

  async updateMany(updateParams: UpdateUserCollectionParams): Promise<UserCollection> {
    return null;
  }

  updateOne(updateParams: UpdateUserParams): Promise<User> {
    return undefined;
  }
}

