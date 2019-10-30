import { ApiModelProperty } from '@nestjs/swagger';

export class ReadRepositoryParams {
  @ApiModelProperty()
  id: string;
}
