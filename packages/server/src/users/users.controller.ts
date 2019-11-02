import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors, UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { RolesEnum, User, UserCollection, userValidationSchema } from '@zorko/dto';
import { UserOneApiService } from './user.one.api.service';
import { Roles } from '../roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { UserManyApiService } from './user.many.api.service';
import { CreateUserParams, ReadUserCollectionParams, UpdateUserParams } from '@zorko/remote-api';
import { YupValidationPipe } from '../utils/YupValidationPipe';

function cleanUpUserResponse (user: User) {

  delete user.password;
  delete user.hashPassword;

  return user;
}

@ApiBearerAuth()
@ApiUseTags('users')
@Controller('users')
export class UsersController  {
  constructor(
    private readonly userService: UserOneApiService,
    private readonly userCollectionService: UserManyApiService
  ) {}

  @Post()
  @ApiOperation({title: 'Create user'})
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(new YupValidationPipe(userValidationSchema()))
  @Roles(RolesEnum.Admin)
  async createOne(@Body() user: CreateUserParams): Promise<string> {
    return await this.userService.createOne(user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async findMany(@Query() query: ReadUserCollectionParams): Promise<UserCollection> {
    return await this.userCollectionService.findMany({
      limit: Number.POSITIVE_INFINITY
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiImplicitParam({name: 'id', required: true})
  async findOne(@Param('id') id): Promise<User> {
    const user = await this.userService.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Can\`t find user with #id: ${id}`);
    }
    return cleanUpUserResponse(user);
  }

  // TODO: add role check for admin
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({title: 'Update user'})
  @UseInterceptors(ClassSerializerInterceptor)
  async updateOne(@Param('id') id: string, @Body() nextUser: UpdateUserParams): Promise<User> {
    console.log(JSON.stringify(nextUser, null, 2));
    const user = await this.userService.updateOne(nextUser);
    return cleanUpUserResponse(user)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({title: 'Remove user'})
  async removeOne(@Param('id') id: string): Promise<void> {
    await this.userService.removeOne({ id });
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RolesEnum.Admin)
  @ApiOperation({title: 'Bulk remove users'})
  async removeMany(): Promise<number> {
    return await this.userCollectionService.removeMany({
      items: []
    });
  }
}
