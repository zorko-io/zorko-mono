import { AuthAxiosApiClient } from '../../auth';
import { RepositoryManyApiClient } from './repository.many.api.client';

export class RepositoryAxiosManyApiClient extends AuthAxiosApiClient implements RepositoryManyApiClient {
  findMany(searchParams?: any): Promise<any> {
    return undefined;
  }
}
