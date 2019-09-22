import defaultUserModelFactory from '../user.model.factory';
import { UserCollectionFactory } from '../user.collection.factory';
import { UserCollectionModel } from '../user.collection.model';

describe('UserCollectionModelFactory', () => {
  let modelsFactory;
  let cursor;

  beforeEach(() => {
    cursor = {
      total: 0,
      limit: 0,
      offset: 0
    };
    modelsFactory = new UserCollectionFactory(defaultUserModelFactory);
  });

  it('create user model from valid data', () => {
    const firstUser = defaultUserModelFactory.create({
      email: 'test@email.com', password: '3223dfdf'
    });

    const secondUser  = defaultUserModelFactory.create({
      email: '3ffv@reeds.com', password: '49mmccjk'
    });

    const expected  = new UserCollectionModel([
      firstUser, secondUser
    ], cursor);

    let actual = modelsFactory.create([
      {
        email: 'test@email.com',
        password: '3223dfdf'
      },
      {
        email: '3ffv@reeds.com',
        password: '49mmccjk'
      }
    ], cursor);

    expect(actual.toDTO()).toEqual(expected.toDTO());
  });
});
