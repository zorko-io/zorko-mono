import { ApiModelProperty } from '@nestjs/swagger';
import { IdentityParams } from '../../../utils/identity.params';

export class DeleteRepositoryParams implements IdentityParams {
  @ApiModelProperty()
  id: string;
}
