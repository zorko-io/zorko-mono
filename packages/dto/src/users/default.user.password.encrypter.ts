import { UserPasswordEncrypter } from './user.password.encrypter';

export class DefaultUserPasswordEncrypter implements UserPasswordEncrypter{
  async compare(left: string, right: string): Promise<boolean> {
    return String(left.length) === right;
  }

  async hash(data: string): Promise<string> {
    return String(data.length);
  }

}
