import { AxiosResponse } from 'axios';
import { AuthAxiosApiClient } from '../../auth';
import { User, UserCollection } from '@zorko/dto';
import { UserManyApiClient } from './user.many.api.client';
import {
  CreateUserCollectionParams,
  DeleteUserCollectionParams,
  ReadUserCollectionParams,
  UpdateUserCollectionParams,
} from '@zorko/remote-api';

export class UserAxiosManyApiClient extends AuthAxiosApiClient implements UserManyApiClient  {

  async findMany(readParams?: ReadUserCollectionParams): Promise<UserCollection> {
    const response: AxiosResponse<UserCollection> = await this.http.get('/users');
    return response.data
  }

  async createMany(createParams: CreateUserCollectionParams): Promise<string[]> {
    return ['123']
  }

  async removeMany(deleteParams: DeleteUserCollectionParams): Promise<number> {
    const response: AxiosResponse<number> = await this.http.delete('/users');
    return response.data
  }

  async updateMany(updateParams: UpdateUserCollectionParams): Promise<UserCollection> {
    return null;
  }

}

