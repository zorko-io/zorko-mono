export interface RemoteOneServiceApi<C,R,U,D> {
  findOne(searchParams: R): Promise<U>
  createOne(createParams: C): Promise<string>
  updateOne(updateParams: U): Promise<R>
  removeOne(deleteParams: D): Promise<void>
}
