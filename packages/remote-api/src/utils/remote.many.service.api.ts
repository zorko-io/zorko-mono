import { RemoteManyReadServiceApi } from './remote.many.read.service.api';

export interface RemoteManyServiceApi<C,R,U,D,E> extends RemoteManyReadServiceApi <R,E> {
  createMany(createParams: C): Promise<string[]>
  updateMany(updateParams: U): Promise<E>
  removeMany(deleteParams: D): Promise<number>
}
