import { AuthApiClient, AuthAxiosApiClient } from '../auth';
import { UserAxiosApiClient } from '../user';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ApiClientFacade } from './api.client.facade';
import { UserProfileApiClient, UserProfileAxiosApiClient } from '../user-profile';

export class AxiosApiClientFacade extends AuthAxiosApiClient implements ApiClientFacade<AxiosRequestConfig> {
  private readonly instance: AxiosInstance;
  public User: UserAxiosApiClient;
  public Auth: AuthApiClient;
  public UserProfile: UserProfileApiClient;

  constructor(config?: AxiosRequestConfig) {
    const instance = axios.create(config);
    super(instance);
    this.instance = instance;

    this.User = new UserAxiosApiClient(this.instance);
    this.Auth = new AuthAxiosApiClient(this.instance);
    this.UserProfile = new UserProfileAxiosApiClient(this.instance)
  }

  setConfig(config: AxiosRequestConfig) {
    this.instance.defaults.baseURL  = config.baseURL;
    return this;
  }

  setResponseInterceptors(response, error) {
    this.instance.interceptors.response.use(response, error);
  }
}
