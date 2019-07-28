import { RemoteManyUserApi } from './remote.many.user.api';
import { RemoteOneUserApi } from './remote.one.user.api';

export interface RemoteUserApi extends RemoteManyUserApi, RemoteOneUserApi {}
