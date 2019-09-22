import { IsArray, IsInt, IsPositive } from 'class-validator';
import { CollectionCursor } from './collection.cursor';

export interface Collection<I> extends CollectionCursor{
  items: Array<I>;
}
