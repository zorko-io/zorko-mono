import { AuthAxiosApiClient } from '../../auth';
import { RepositoryOneApiClient } from './repository.one.api.client';
import {
  InputValidation,
  CreateRepositoryParams,
  ReadRepositoryParams,
  readRepositoryParamsValidationSchema,
  deleteRepositoryParamsValidationSchema,
  DeleteRepositoryParams,
} from '@zorko/remote-api';
import { AxiosResponse } from 'axios';
import { Repository, repositoryValidationSchema } from '@zorko/dto';

export class RepositoryAxiosOneApiClient extends AuthAxiosApiClient implements RepositoryOneApiClient {

  @InputValidation(repositoryValidationSchema())
  async createOne(createParams: CreateRepositoryParams): Promise<string> {
    const response: AxiosResponse<string> = await this.http.post(
      '/repositories',
      createParams
    );
    return response.data;
  }

  @InputValidation(readRepositoryParamsValidationSchema())
  async findOne(params: ReadRepositoryParams): Promise<Repository> {
    const response: AxiosResponse<Repository> = await this.http.get(
      `/repositories/${params.id}`
    );
    return response.data;
  }

  @InputValidation(deleteRepositoryParamsValidationSchema())
  async removeOne(params: DeleteRepositoryParams): Promise<void> {
    await this.http.delete(`/repositories/${params.id}`);
  }

  async updateOne(updateParams: any): Promise<any> {
    return undefined;
  }
}
