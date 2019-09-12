export interface SearchRemoteParams {
  id?: string;
}

export interface RemoteEntity {
  id: string;
}

export interface RemoteSearchEntityServiceApi<
  S extends SearchRemoteParams,
  E extends RemoteEntity> {
  findOne(params: S): Promise<E>
}

export interface RemoteCreateEntityServiceApi<
  C,
  E extends RemoteEntity> {
  createOne(params: C): Promise<string>
}

export interface RemoteOneServiceApi<
  S extends SearchRemoteParams,
  E extends RemoteEntity,
  C>
  extends
    RemoteSearchEntityServiceApi<S, E>,
    RemoteCreateEntityServiceApi<C, E>{}
