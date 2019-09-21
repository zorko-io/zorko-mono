import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { RolesEnum } from '@zorko/dto';

export class CreateUserParams {
  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  @IsString()
  readonly password: string;

  @ApiModelProperty()
  readonly roles?: RolesEnum[];
}
