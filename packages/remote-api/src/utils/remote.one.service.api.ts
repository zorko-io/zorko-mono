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

export interface RemoteOneServiceApi<
  S extends SearchRemoteParams,
  E extends RemoteEntity> extends RemoteSearchEntityServiceApi<S, E>{}
