import { User } from './user';
import { UserModel } from './user.model';
import { userValidationSchema } from './user.validation.schema';

export class UserModelFactory {

  constructor(){
    this.create = this.create.bind(this);
  }

  create (user: User) {
    return new UserModel(
      user,
      userValidationSchema()
    );

  }
}

const defaultUserModelFactory = new UserModelFactory();

export default defaultUserModelFactory;
