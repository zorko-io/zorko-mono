import { CreateTokenDto } from '@zorko/dto';
import { RemoteAuthApi } from '@zorko/remote-api';

export interface AuthApiClient extends RemoteAuthApi {
  loginAs(createToken: CreateTokenDto): Promise<this>
}
