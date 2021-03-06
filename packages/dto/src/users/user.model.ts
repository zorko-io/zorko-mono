import { User } from './user';
import { RolesEnum } from '../roles';
import { ObjectSchema } from 'yup';
import { UserPasswordEncrypter } from './user.password.encrypter';

export class UserModel {

  private encrypter: UserPasswordEncrypter;
  private storage: User;
  private schema: ObjectSchema;

  constructor(
    storage: User,
    schema: ObjectSchema,
    encrypter: UserPasswordEncrypter
  ) {
    this.storage = storage;
    this.schema = schema;
    this.encrypter = encrypter;
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

  getLogin(): string {
    return this.storage.login;
  }

  setLogin(login: string): this {
    this.storage.login = login;
    return this;
  }

  async encryptPassword(): Promise<this> {
    const encryptedPassword = await this.encrypter.hash(
      this.getPassword()
    );
    this.setHashPassword(encryptedPassword);
    this.setPassword(undefined);
    return this;
  }

  setHashPassword(hashPassword: string) {
    this.storage.hashPassword = hashPassword;
    return this;
  }

  shouldEncryptPassword (): boolean {
    return this.getPassword() && !this.getHashPassword();
  }

  async comparePassword(originalPassword: string): Promise<boolean> {
    return await this.encrypter.compare(originalPassword, this.getHashPassword());
  }

  merge(nextUser: UserModel){

    if (this.getLogin() !== nextUser.getLogin()){
      this.setLogin(nextUser.getLogin());
    }

    if (this.getEmail() !== nextUser.getEmail()){
      this.setEmail(nextUser.getEmail());
    }

    if (this.getPassword() !== nextUser.getPassword()){
      this.setPassword(nextUser.getPassword());
    }

    if (this.getHashPassword() !== nextUser.getHashPassword()){
      this.setHashPassword(nextUser.getHashPassword());
    }

    if (this.getRoles() !== nextUser.getRoles()){
      this.setRoles(nextUser.getRoles());
    }

    return this;
  }

  toDTO(): User {
    this.schema.validateSync(this.storage);

    return {
      id: this.storage.id,
      email: this.storage.email,
      password: this.storage.password,
      hashPassword: this.storage.hashPassword,
      roles: this.storage.roles,
      login: this.storage.login
    }
  }

  getHashPassword() {
    return this.storage.hashPassword;
  }
}
