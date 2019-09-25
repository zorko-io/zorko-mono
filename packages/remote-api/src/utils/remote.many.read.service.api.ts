export interface RemoteManyReadServiceApi<R, E> {
  findMany(searchParams?: R): Promise<E>
}
