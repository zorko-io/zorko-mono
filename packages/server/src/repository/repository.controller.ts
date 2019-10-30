import {
  Body,
  Controller,
  Get, Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { CreateRepositoryParams } from '@zorko/remote-api';
import { AuthGuard } from '@nestjs/passport';
import { RepositoryOneApiService } from './repository.one.api.service';
import { YupValidationPipe } from '../utils/YupValidationPipe';
import { repositoryValidationSchema } from '@zorko/dto';

@ApiBearerAuth()
@ApiUseTags('repositories')
@Controller('repositories')
export class RepositoryController {

  constructor(
    private readonly repositoryOneApiService: RepositoryOneApiService
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new YupValidationPipe(repositoryValidationSchema()))
  @ApiOperation({title: 'Create repository'})
  async createOne(@Body() params: CreateRepositoryParams): Promise<string> {
    // TODO: find current user from context to setup owner of repository, also think about admin's actions
    return await this.repositoryOneApiService.createOne(params);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiImplicitParam({name: 'id', required: true})
  async findOne(@Param('id') id) {
     // TODO: common read params validation schema doesn't map one-to-one to controller
     return await this.repositoryOneApiService.findOne({
       id
     });
  }

}
