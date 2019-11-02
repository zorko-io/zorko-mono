import { User } from './user';
import { UserModel } from './user.model';
import { userValidationSchema } from './user.validation.schema';
import { UserPasswordEncrypter } from './user.password.encrypter';
import { DefaultUserPasswordEncrypter } from './default.user.password.encrypter';

export class UserModelFactory {
  private encrypter: UserPasswordEncrypter;

  constructor(encrypter?: UserPasswordEncrypter){
    this.create = this.create.bind(this);
    this.encrypter = encrypter ? encrypter : new DefaultUserPasswordEncrypter();
  }

  create (user: User): UserModel {
    return new UserModel(
      user,
      userValidationSchema(),
      this.encrypter
    );

  }
}

const defaultUserModelFactory = new UserModelFactory();

export default defaultUserModelFactory;
