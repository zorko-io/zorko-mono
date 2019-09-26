import { AuthAxiosApiClient } from '../../auth';
import { RepositoryOneApiClient } from './repository.one.api.client';
import { CreateRepositoryParams } from '@zorko/remote-api';
import { AxiosResponse } from 'axios';

export class RepositoryAxiosOneApiClient extends AuthAxiosApiClient implements RepositoryOneApiClient {

  async createOne(createParams: CreateRepositoryParams): Promise<string> {
    const response: AxiosResponse<string> = await this.http.post(
      '/repositories',
      createParams
    );
    return response.data;
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
