import { UserModelFactory } from '../user.model.factory';
import defaultUserValidationSchemaFactory from '../user.validation.schema.factory';
import { UserModel } from '../user.model';

describe('UserModelFactory', () => {
  let modelFactory;

  beforeEach(() => {
    modelFactory = new UserModelFactory(defaultUserValidationSchemaFactory);
  });

  it('create user model from valid data', () => {
    expect(modelFactory.create()).toBeInstanceOf(UserModel);
  });

});
