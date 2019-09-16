import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { RolesEnum } from '@zorko/dto';

export class CreateUserParams {
  @ApiModelProperty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiModelProperty()
  @IsOptional()
  @IsArray()
  readonly roles?: RolesEnum[];
}
