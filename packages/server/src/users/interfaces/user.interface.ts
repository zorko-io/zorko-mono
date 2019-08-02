import { RolesEnum } from '@zorko/dto';

export interface User {
  id: string;
  email: string;
  password: string;
  roles: RolesEnum[]
}
