import { RolesEnum, User } from '@zorko/dto';

export class UpdateUserParams implements User{
  id?: any;
  email: string;
  password: string;
  roles: RolesEnum[];
}

