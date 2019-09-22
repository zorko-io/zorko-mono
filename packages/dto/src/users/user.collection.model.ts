import { UserModel } from './user.model';
import { UserCollection } from './user.collection';
import { CollectionCursor } from '../collection/collection.cursor';

export class UserCollectionModel {
  private models: UserModel[];
  private cursor: CollectionCursor;

  constructor(users: UserModel[], cursor: CollectionCursor){
    this.models = users;
    this.cursor = cursor;
  }

  toDTO(): UserCollection {
    return {
      items: this.models.map((item => {
        return item.toDTO()
      })),
      total: this.cursor.total,
      limit: this.cursor.limit,
      offset: this.cursor.offset
    }
  }

}

