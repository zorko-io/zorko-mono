import { AxiosResponse } from 'axios';
import { AuthAxiosApiClient } from '../auth';
import { CreateUserDto, UserDto } from '@zorko/dto';
import { UserApiClient } from './user.api.client';

export class UserAxiosApiClient extends AuthAxiosApiClient implements UserApiClient  {

  async findMany(): Promise<UserDto[]> {
    const response: AxiosResponse<UserDto[]> = await this.http.get('/users');
    return response.data
  }

  async createOne(user: CreateUserDto): Promise<string> {
    const response: AxiosResponse<string> = await this.http.post('/users', user);
    return response.data;
  }

  async findOne(userId: string): Promise<UserDto> {
    const response: AxiosResponse<UserDto> = await this.http.get(`/users/${userId}`);
    return response.data;
  }

  async createMany(users: CreateUserDto[]): Promise<string[]> {
    return ['1', '2', '3'];
  }

  async removeMany(userIds: string[] = []): Promise<number> {
    const response: AxiosResponse<number> = await this.http.delete('/users');
    return response.data
  }

  async removeOne(id: string): Promise<void> {
    await this.http.delete(`/users/${id}`);
  }
}

