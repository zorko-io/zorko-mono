import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RolesEnum } from '../index';

export class CreateUserDto {
  readonly email: string;

  readonly password: string;

  readonly roles?: RolesEnum[];
}
