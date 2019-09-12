import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserProfileDto{
  @IsString()
  @IsNotEmpty()
  readonly login: string;
}
