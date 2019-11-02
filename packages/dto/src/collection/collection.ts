import { CollectionCursor } from './collection.cursor';

export interface Collection<I> extends CollectionCursor{
  items: Array<I>;
}
