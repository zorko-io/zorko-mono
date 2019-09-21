import { RolesEnum } from '../roles';

export interface User {
  id?: any;
  email: string;
  password?: string;
  hashPassword?: string;

  roles?: RolesEnum[];
}
