import { CreateTokenDto, TokenDto } from '@zorko/dto';

export interface RemoteAuthApi {
  createToken(createToken: CreateTokenDto): Promise<TokenDto>;
}
