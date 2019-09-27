import { UserModelFactory } from '../user.model.factory';
import { UserModel } from '../user.model';

describe('UserModelFactory', () => {
  let modelFactory;

  beforeEach(() => {
    modelFactory = new UserModelFactory();
  });

  it('create user model from valid data', () => {
    expect(modelFactory.create()).toBeInstanceOf(UserModel);
  });

});
