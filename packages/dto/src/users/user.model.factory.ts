import { User } from './user';
import { UserModel } from './user.model';
import defaultUserValidationSchemaFactory , {
  UserValidationSchemaFactory
} from './user.validation.schema.factory';

export class UserModelFactory {
  private schemaFactory: UserValidationSchemaFactory;

  constructor(schemaFactory: UserValidationSchemaFactory){
    this.schemaFactory = schemaFactory;
    this.create = this.create.bind(this);
  }

  create (user: User) {
    return new UserModel(
      user,
      this.schemaFactory.create()
    );

  }
}

const defaultUserModelFactory = new UserModelFactory(
  defaultUserValidationSchemaFactory
);

export default defaultUserModelFactory;
