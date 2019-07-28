import { UserDto, CreateUserDto, ListUserQuery} from '@zorko/dto';

export interface RemoteManyUserApi {
  findMany(query?: ListUserQuery): Promise<UserDto[]>;
  createMany(users: CreateUserDto[]): Promise<string[]>;
  removeMany(userIds?: string[]): Promise<number>;
}
