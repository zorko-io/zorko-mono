import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { CreateRepositoryParams, readRepositoryParamsValidationSchema } from '@zorko/remote-api';
import { AuthGuard } from '@nestjs/passport';
import { RepositoryOneApiService } from './repository.one.api.service';
import { YupValidationPipe } from '../utils/YupValidationPipe';

@ApiBearerAuth()
@ApiUseTags('repositories')
@Controller('repositories')
export class RepositoryController {

  constructor(
    private readonly repositoryOneApiService: RepositoryOneApiService
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new YupValidationPipe(readRepositoryParamsValidationSchema()))
  @ApiOperation({title: 'Create repository'})
  async createOne(@Body() params: CreateRepositoryParams): Promise<string> {

    // TODO: find current user from context to setup owner of repository, also think about admin's actions

    return await this.repositoryOneApiService.createOne(params);
  }


}
