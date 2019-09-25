import { RemoteManyUserApi } from './many/remote.many.user.api';
import { RemoteOneUserApi } from './one/remote.one.user.api';

export interface RemoteUserApi extends RemoteManyUserApi, RemoteOneUserApi {}
