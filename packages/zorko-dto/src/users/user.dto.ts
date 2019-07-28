import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import { RolesEnum } from '../index';

export class UserDto {
  @ApiModelProperty()
  @IsString()
  id: string;

  @ApiModelProperty()
  @IsEmail()
  email: string;

  @Exclude()
  password?: string;

  @ApiModelProperty({required: false})
  @IsArray()
    // TODO: how to exclude it from user when it was requested by not an admin?
  roles?: RolesEnum[];

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
