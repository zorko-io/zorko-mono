import { BaseCollectionDto } from './base.collection.dto';

export class BaseCollection<I> {

  private items: Array<I> = [];
  private total: number;


  constructor(context?: Partial<BaseCollectionDto<I>>){
    let total = 0;
    let items = [];

    if (context){
      if (context.items){
        items = context.items;
      }
      if (!context.total){
        total = items.length;
      }else {
        total = context.total;
      }
    }

    this.items = items;
    this.total = total;

    this.validate();
  }

  protected validate() {
    if (this.items.length > this.total){
      throw Error('Invalid arguments');
    }
  }

  setItems(items: Array<I>): this {
    this.items = items;
    this.validate();
    return this;
  }

  setTotal(total: number): this {
    this.total = total;
    this.validate();
    return this;
  }

  toDTO(): BaseCollectionDto<I> {
    return {
      items: this.items,
      total: this.total
    }
  }

}
