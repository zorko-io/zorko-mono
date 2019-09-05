import { TokenDto } from '@zorko/dto';
import { RequestState } from '../request';

export interface AuthState {
  readonly token: TokenDto
  readonly request: RequestState
}
