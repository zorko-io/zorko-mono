import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserProfileParams {
  @IsString()
  @IsNotEmpty()
  readonly login: string;
}
