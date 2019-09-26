import { ApiModelProperty } from '@nestjs/swagger';
import { RolesEnum } from '@zorko/dto';

export class CreateUserParams {
  @ApiModelProperty()
  readonly email: string;

  @ApiModelProperty()
  readonly password: string;

  @ApiModelProperty()
  readonly roles?: RolesEnum[];
}
