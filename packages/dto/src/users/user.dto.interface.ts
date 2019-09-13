import { RolesEnum } from '../roles';

export interface UserDtoInterface {
  id?: any;
  email: string;
  password?: string;
  roles?: RolesEnum[];
}
