import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { RolesEnum } from '../index';
import { User } from './user';

export class UserValidationSchema implements User {
  @ApiModelProperty()
  @IsOptional()
  id?: any;

  @ApiModelProperty()
  @IsEmail()
  email: string;


  @IsString()
  @IsOptional()
  password?: string;

  @ApiModelProperty({required: false})
  @IsArray()
  @IsOptional()
  roles?: RolesEnum[];
}
