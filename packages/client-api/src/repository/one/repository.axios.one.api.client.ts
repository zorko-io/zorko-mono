import { AuthAxiosApiClient } from '../../auth';
import { RepositoryOneApiClient } from './repository.one.api.client';

export class RepositoryAxiosOneApiClient extends AuthAxiosApiClient implements RepositoryOneApiClient {
  createOne(createParams: any): Promise<string> {
    return undefined;
  }

  findOne(searchParams: any): Promise<any> {
    return undefined;
  }

  removeOne(deleteParams: any): Promise<void> {
    return undefined;
  }

  updateOne(updateParams: any): Promise<any> {
    return undefined;
  }
}
