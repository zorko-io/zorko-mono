import { User } from './user';
import defaultUserModelFactory, { UserModelFactory } from './user.model.factory';
import { UserCollectionModel } from './user.collection.model';
import { CollectionCursor } from '../collection/collection.cursor';

export class UserCollectionFactory {
  private userModelFactory: UserModelFactory;

  constructor(userModelFactory: UserModelFactory) {
    this.userModelFactory = userModelFactory;
    this.create = this.create.bind(this);
  }

  create(users: User[], cursor: CollectionCursor) {
    const models = users.map(this.userModelFactory.create);

    return new UserCollectionModel(models, cursor)
  }

}

const defaultUserCollectionFactory = new UserCollectionFactory(
  defaultUserModelFactory
);

export default defaultUserCollectionFactory;
