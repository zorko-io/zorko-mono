import { BaseCollectionInterface } from './base.collection.interface';

export class BaseCollection<I> implements BaseCollectionInterface<I> {
  items: I[];
  total: number;
  limit: number;
  offset: number;

  constructor(context?: Partial<BaseCollectionInterface<I>>){
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

  toDTO(): BaseCollectionInterface<I> {
    return {
      items: this.items.map((item => {
        // @ts-ignore
        return item.toDTO()
      })),
      total: this.total
    }
  }

}
