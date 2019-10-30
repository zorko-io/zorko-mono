import { RemoteOneServiceApi } from '../../utils/remote.one.service.api';
import { CreateRepositoryParams, ReadRepositoryParams } from './params';
import { Repository } from '@zorko/dto';

export interface RemoteOneRepositoryApi extends
  RemoteOneServiceApi <
    CreateRepositoryParams,
    ReadRepositoryParams,
    any,
    any,
    Repository
    >
{}
