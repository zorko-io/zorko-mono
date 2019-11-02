import { UserModelFactory } from '../user.model.factory';
import { UserModel } from '../user.model';
import { userFakeGenerator } from '../user.fake.generator';

describe('UserModelFactory', () => {
  let modelFactory;
  let data;

  beforeEach(() => {
    modelFactory = new UserModelFactory();
  });

  it('create user model from valid data', () => {
    data = userFakeGenerator.getMinimalRandomValidUser();
    expect(modelFactory.create(data)).toBeInstanceOf(UserModel);
  });

});
