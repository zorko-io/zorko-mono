import { User } from './user';
import { UserModel } from './user.model';
import userValidationSchemaFactory, {
  UserValidationSchemaFactory
} from './user.validation.schema.factory';

export class UserModelFactory {
  private schemaFactory: UserValidationSchemaFactory;

  constructor(schemaFactory: UserValidationSchemaFactory){
    this.schemaFactory = schemaFactory;
  }

  create (user: User) {
    return new UserModel(
      user,
      this.schemaFactory.create()
    );

  }
}

export default new UserModelFactory(userValidationSchemaFactory)
