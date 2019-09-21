import { IsArray, IsInt, IsPositive } from 'class-validator';

export interface BaseCollectionInterface<I> {
  items: Array<I>;
  total: number;
  offset?: number;
  limit?: number;
}
