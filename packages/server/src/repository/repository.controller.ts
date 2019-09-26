import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { CreateRepositoryParams } from '@zorko/remote-api';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiUseTags('repositories')
@Controller('repositories')
export class RepositoryController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({title: 'Create repository'})
  async createOne(@Body() params: CreateRepositoryParams): Promise<string> {
      return '34334'
  }


}
