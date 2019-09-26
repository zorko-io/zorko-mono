import { RemoteOneServiceApi } from '../../utils/remote.one.service.api';
import { CreateRepositoryParams } from './params';

export interface RemoteOneRepositoryApi extends
  RemoteOneServiceApi <
    CreateRepositoryParams,
    any,
    any,
    any,
    any
    >
{}
