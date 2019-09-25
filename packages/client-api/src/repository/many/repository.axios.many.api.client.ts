import { AuthAxiosApiClient } from '../../auth';
import { RepositoryManyApiClient } from './repository.many.api.client';

export class RepositoryAxiosManyApiClient extends AuthAxiosApiClient implements RepositoryManyApiClient {
  createMany(createParams: any): Promise<string[]> {
    return undefined;
  }

  findMany(searchParams?: any): Promise<any> {
    return undefined;
  }

  removeMany(deleteParams: any): Promise<number> {
    return undefined;
  }

  updateMany(updateParams: any): Promise<any> {
    return undefined;
  }
}
