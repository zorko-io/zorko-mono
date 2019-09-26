import { Repository } from '@zorko/dto/lib/repository';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateRepositoryParams implements Repository{
  @ApiModelProperty()
  description: string;
  @ApiModelProperty()
  name: string;
  @ApiModelProperty()
  owner: string;
}
