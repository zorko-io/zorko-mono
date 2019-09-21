export interface RemoteManyServiceApi<C,R,U,D,E> {
  findMany(searchParams?: R): Promise<E>
  createMany(createParams: C): Promise<string>
  updateMany(updateParams: U): Promise<E>
  removeMany(deleteParams: D): Promise<string>
}
