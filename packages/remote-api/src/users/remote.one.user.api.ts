import { UserDto, CreateUserDto } from '@zorko/dto';

export interface RemoteOneUserApi {
  createOne(user: CreateUserDto): Promise<string>;
  removeOne(id: string): Promise<void>;
  findOne(userId: string): Promise<UserDto>;
}
