import { IsArray, IsInt, IsPositive } from 'class-validator';

export class BaseCollectionDto<I> {
  @IsArray()
  items: Array<I>;
  @IsPositive()
  @IsInt()
  total: number;
}
