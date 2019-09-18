import { User } from './user';
import { RolesEnum } from '../roles';
import { validateSync, ValidationError } from 'class-validator';
import { ObjectSchema } from 'yup';
import { userValidationSchema } from './user.validation.schema';

export class UserModel {

  private dto: User;
  private schema: ObjectSchema;

  constructor(email: string) {
    this.dto = { email };
    this.schema = userValidationSchema;
  }

  getId(): string {
    return this.dto.id;
  }

  setId(id: string): this {
    this.dto.id = id;
    return this;
  }

  getEmail(): string {
    return this.dto.email;
  }

  setEmail(email: string): this {
    this.dto.email = email;
    return this;
  }

  getPassword(): string  {
    return this.dto.password;
  }

  setPassword(password: string): this {
    this.dto.password = password;
    return this;
  }

  getRoles(): RolesEnum[] {
    return this.hasRoles() ? this.dto.roles : [];
  }

  hasRoles () : boolean {
    return this.dto.roles && this.dto.roles.length > 0
  }

  setRoles(roles: RolesEnum[]): this {
    this.dto.roles = roles;
    return this;
  }

  toDTO(): User {
    this.schema.validateSync(this.dto);

    return {
      id: this.dto.id,
      email: this.dto.email,
      password: this.dto.password,
      roles: this.dto.roles
    }
  }
}
