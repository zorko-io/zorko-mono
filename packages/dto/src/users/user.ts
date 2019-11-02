import { RolesEnum } from '../roles';

export interface User {
  id?: any;
  login?: string;
  email: string;
  password?: string;
  hashPassword?: string;

  roles?: RolesEnum[];
}
