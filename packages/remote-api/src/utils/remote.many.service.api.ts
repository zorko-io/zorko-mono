export interface RemoteManyServiceApi<C,R,U,D> {
  findMany(searchParams?: R): Promise<U>
  createMany(createParams: C): Promise<string>
  updateMany(updateParams: U): Promise<R>
  removeMany(deleteParams: D): Promise<string>
}
