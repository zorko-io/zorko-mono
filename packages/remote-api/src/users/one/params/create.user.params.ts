import { RolesEnum } from '@zorko/dto';

export class CreateUserParams {
  readonly email: string;

  readonly password: string;

  readonly roles?: RolesEnum[];
}
