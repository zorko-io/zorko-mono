import { AxiosInstance, AxiosResponse } from 'axios';
import { AuthApiClient } from './auth.api.client';
import { CreateTokenDto, TokenDto} from '@zorko/dto';

export class AuthAxiosApiClient implements AuthApiClient {
  protected readonly http: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.http = instance;
  }

  async createToken(createToken: CreateTokenDto): Promise<TokenDto> {
    const response: AxiosResponse<TokenDto> = await this.http.post('/auth/token', createToken);
    return response.data;
  }

  async loginAs(createToken: CreateTokenDto): Promise<this> {
    const token: TokenDto = await this.createToken(createToken);
    return this.setAccessToken(token.accessKey);
  }

  private setAccessToken(token: string): this {
    this.http.defaults.headers.common.Authorization = `Bearer ${token}`;
    return this;
  }
}
