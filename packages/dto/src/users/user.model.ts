import { User } from './user';
import { RolesEnum } from '../roles';
import { ObjectSchema } from 'yup';
import { userValidationSchema } from './user.validation.schema';

export class UserModel {

  private userStorage: User;
  private schema: ObjectSchema;

  constructor(email: string, password: string) {
    this.userStorage = { email, password };
    this.schema = userValidationSchema;
  }

  getId(): string {
    return this.userStorage.id;
  }

  setId(id: string): this {
    this.userStorage.id = id;
    return this;
  }

  getEmail(): string {
    return this.userStorage.email;
  }

  setEmail(email: string): this {
    this.userStorage.email = email;
    return this;
  }

  getPassword(): string  {
    return this.userStorage.password;
  }

  setPassword(password: string): this {
    this.userStorage.password = password;
    return this;
  }

  getRoles(): RolesEnum[] {
    return this.hasRoles() ? this.userStorage.roles : [];
  }

  hasRoles () : boolean {
    return this.userStorage.roles && this.userStorage.roles.length > 0
  }

  setRoles(roles: RolesEnum[]): this {
    this.userStorage.roles = roles;
    return this;
  }

  toDTO(): User {
    this.schema.validateSync(this.userStorage);

    return {
      id: this.userStorage.id,
      email: this.userStorage.email,
      password: this.userStorage.password,
      roles: this.userStorage.roles
    }
  }

  setHashPassword(hashPassword: string) {
    this.userStorage.hashPassword = hashPassword;
    this.userStorage.password = undefined;
    return this;
  }

  getHashPassword() {
    return this.userStorage.hashPassword;
  }
}
