import defaultUserModelFactory from '../user.model.factory';
import { UserCollectionModel } from '../user.collection.model';

describe('UserCollectionModel', () => {
  let collection;
  let firstUser;
  let cursor;

  beforeEach(() => {
    cursor = {
      total: 0,
      limit: 0,
      offset: 0
    };
  });

  it('creates with one user', () => {
    firstUser = defaultUserModelFactory.create({
      email: 'test@sdd.com', password: '43423fdffd'
    });
    collection = new UserCollectionModel([firstUser], cursor);

    expect(collection.toDTO()).toEqual({
      items: [firstUser.toDTO()],
      ...cursor
    });
  });

  it('creates with few users', () => {
    firstUser = defaultUserModelFactory.create({
      email: 'test@sdd.com', password: '43423fdffd'
    });

    const secondUser = defaultUserModelFactory.create({
      email: 'test1111@sdd.com', password: 'fdfdj3223'
    });

    const thirdUser  = defaultUserModelFactory.create({
      email: 'test2222@sdd.com', password: '434238fhfhffdffd'
    });
    collection = new UserCollectionModel([firstUser, secondUser, thirdUser], cursor);

    expect(collection.toDTO()).toEqual({
      items: [firstUser.toDTO(), secondUser.toDTO(), thirdUser.toDTO()],
      ...cursor
    });
  });

});
