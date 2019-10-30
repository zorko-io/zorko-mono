import { AuthAxiosApiClient } from '../../auth';
import { RepositoryOneApiClient } from './repository.one.api.client';
import { CreateRepositoryParams, ReadRepositoryParams } from '@zorko/remote-api';
import { AxiosResponse } from 'axios';
import { Repository } from '@zorko/dto';

export class RepositoryAxiosOneApiClient extends AuthAxiosApiClient implements RepositoryOneApiClient {

  async createOne(createParams: CreateRepositoryParams): Promise<string> {
    const response: AxiosResponse<string> = await this.http.post(
      '/repositories',
      createParams
    );
    return response.data;
  }

  // @InputValidation(readRepositoryParamsValidationSchema())
  async findOne(readParams: ReadRepositoryParams): Promise<Repository> {
    // TODO: add params validation here
    let repoUuid;

    if (readParams && readParams.id){
      repoUuid = readParams.id;
    }

    const response: AxiosResponse<Repository> = await this.http.get(
      `/repositories/${repoUuid}`
    );
    return response.data;
  }

  async removeOne(deleteParams: any): Promise<void> {
    return undefined;
  }

  async updateOne(updateParams: any): Promise<any> {
    return undefined;
  }
}
