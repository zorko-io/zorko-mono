export interface RemoteOneServiceApi<C,R,U,D,E> {
  findOne(searchParams: R): Promise<E>
  createOne(createParams: C): Promise<string>
  updateOne(updateParams: U): Promise<E>
  removeOne(deleteParams: D): Promise<void>
}
