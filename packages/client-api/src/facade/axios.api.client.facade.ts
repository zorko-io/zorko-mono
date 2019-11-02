import { AuthApiClient, AuthAxiosApiClient } from '../auth';
import { UserAxiosManyApiClient, UserAxiosOneApiClient } from '../user';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiClientFacade } from './api.client.facade';
import { UserProfileAxiosOneApiClient } from '../user-profile';
import { RepositoryAxiosOneApiClient } from '../repository/one';
import { RepositoryAxiosManyApiClient } from '../repository/many';

export class AxiosApiClientFacade extends AuthAxiosApiClient implements ApiClientFacade<AxiosRequestConfig> {
  private readonly instance: AxiosInstance;
  public User: UserAxiosOneApiClient;
  public Users: UserAxiosManyApiClient;
  public Auth: AuthApiClient;
  public UserProfile: UserProfileAxiosOneApiClient;
  public Repository: RepositoryAxiosOneApiClient;
  public Repositories: RepositoryAxiosManyApiClient;

  constructor(config?: AxiosRequestConfig) {
    const instance = axios.create(config);
    super(instance);
    this.instance = instance;

    this.instance.interceptors.response.use(function (response) {
      return response;
    }, this.handleExceptionMapping);

    this.User = new UserAxiosOneApiClient(this.instance);
    this.Users = new UserAxiosManyApiClient(this.instance);
    this.Auth = new AuthAxiosApiClient(this.instance);
    this.UserProfile = new UserProfileAxiosOneApiClient(this.instance);
    this.Repository = new RepositoryAxiosOneApiClient(this.instance);
    this.Repositories = new RepositoryAxiosManyApiClient(this.instance);
  }

  handleExceptionMapping(error){

    /// TODO: add 404 handler, ClientApiUnexpectedError switch to error instances

    if (!error.response){
      return Promise.reject(error);
    }

    switch (error.response.status) {
      case 400: {
        return Promise.reject({
          name: 'RemoteValidationError',
          ...error.response.data
        });
      }
      case 403: {
        return Promise.reject({
          name: 'RemoteForbiddenError',
          message: error.response.data.message
        });
      }
      default: return Promise.reject(error)
    }
  }

  setConfig(config: AxiosRequestConfig) {
    this.instance.defaults.baseURL  = config.baseURL;
    return this;
  }

  setResponseInterceptors(response, error) {
    this.instance.interceptors.response.use(response, error);
  }
}
