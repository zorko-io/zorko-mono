import { AuthApiClient, AuthAxiosApiClient } from '../auth';
import { UserAxiosApiClient } from '../user';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiClientFacade } from './api.client.facade';
import { UserProfileApiClient, UserProfileAxiosApiClient } from '../user-profile';
import { RepositoryAxiosOneApiClient } from '../repository/one';
import { RepositoryAxiosManyApiClient } from '../repository/many';

export class AxiosApiClientFacade extends AuthAxiosApiClient implements ApiClientFacade<AxiosRequestConfig> {
  private readonly instance: AxiosInstance;
  public User: UserAxiosApiClient;
  public Auth: AuthApiClient;
  public UserProfile: UserProfileApiClient;
  public Repository: RepositoryAxiosOneApiClient;
  public Repositories: RepositoryAxiosManyApiClient;

  constructor(config?: AxiosRequestConfig) {
    const instance = axios.create(config);
    super(instance);
    this.instance = instance;

    this.User = new UserAxiosApiClient(this.instance);
    this.Auth = new AuthAxiosApiClient(this.instance);
    this.UserProfile = new UserProfileAxiosApiClient(this.instance);
    this.Repository = new RepositoryAxiosOneApiClient(this.instance);
    this.Repositories = new RepositoryAxiosManyApiClient(this.instance);
  }

  setConfig(config: AxiosRequestConfig) {
    this.instance.defaults.baseURL  = config.baseURL;
    return this;
  }

  setResponseInterceptors(response, error) {
    this.instance.interceptors.response.use(response, error);
  }
}
