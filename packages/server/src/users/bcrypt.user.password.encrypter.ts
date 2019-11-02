import * as bcrypt from 'bcrypt';
import { UserPasswordEncrypter } from '@zorko/dto';

export class BCryptUserPasswordEncrypter implements UserPasswordEncrypter{
  private options: any;

  constructor(options?: any) {
    this.options = options || {};
  }

  async compare(originalPassword: string, hashPassword: string): Promise<boolean> {
    return bcrypt.compare(originalPassword, hashPassword);
  }

  async hash(data: string): Promise<string> {
    return bcrypt.hash(data, this.options.salt);
  }

}
