import { User } from './user';
import { RolesEnum } from '../roles';
import { ObjectSchema } from 'yup';

export class UserModel {

  private storage: User;
  private schema: ObjectSchema;

  constructor(storage: User, schema: ObjectSchema) {
    this.storage = storage;
    this.schema = schema;
    if (!storage.login) {
      storage.login = storage.email.split('@')[0];
    }
  }

  getId(): string {
    return this.storage.id;
  }

  setId(id: string): this {
    this.storage.id = id;
    return this;
  }

  getEmail(): string {
    return this.storage.email;
  }

  setEmail(email: string): this {
    this.storage.email = email;
    return this;
  }

  getPassword(): string  {
    return this.storage.password;
  }

  setPassword(password: string): this {
    this.storage.password = password;
    return this;
  }

  getRoles(): RolesEnum[] {
    return this.hasRoles() ? this.storage.roles : [];
  }

  hasRoles () : boolean {
    return this.storage.roles && this.storage.roles.length > 0
  }

  setRoles(roles: RolesEnum[]): this {
    this.storage.roles = roles;
    return this;
  }

  toDTO(): User {

    this.schema.validateSync(this.storage);

    return {
      id: this.storage.id,
      email: this.storage.email,
      password: this.storage.password,
      roles: this.storage.roles,
      login: this.storage.login
    }
  }

  setHashPassword(hashPassword: string) {
    this.storage.hashPassword = hashPassword;
    this.storage.password = undefined;
    return this;
  }

  getHashPassword() {
    return this.storage.hashPassword;
  }
}
