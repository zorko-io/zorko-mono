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
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiImplicitParam, ApiOperation, ApiUseTags } from '@nestjs/swagger';
import { CreateUserDto, ListUserQuery, RolesEnum, UserDto, UserDtoInterface } from '@zorko/dto';
import { UserService } from './user.service';
import { Roles } from '../roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { UserCollectionService } from './user.collection.service';
import { UpdateUserCollectionParams } from '@zorko/remote-api';

function cleanUpUserResponse (user: UserDtoInterface) {

  delete user.password;

  return user;
}

@ApiBearerAuth()
@ApiUseTags('users')
@Controller('users')
export class UsersController  {
  constructor(
    private readonly userService: UserService,
    private readonly userCollectionService: UserCollectionService
  ) {}

  @Post()
  @ApiOperation({title: 'Create user'})
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RolesEnum.Admin)
  async createOne(@Body() createCatDto: CreateUserDto): Promise<string> {
    return await this.userService.createOne(createCatDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async findMany(@Query() query: ListUserQuery): Promise<UpdateUserCollectionParams> {
    return await this.userCollectionService.findMany({
      limit: Number.POSITIVE_INFINITY
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiImplicitParam({name: 'id', required: true})
  async findOne(@Param('id') id): Promise<UserDto> {
    const user = await this.userService.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Can\`t find user with #id: ${id}`);
    }
    return cleanUpUserResponse(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async updateOne(@Param('id') id: string, @Body() nextUser: UserDto): Promise<UserDto> {
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
  async removeMany(): Promise<string> {
    return await this.userCollectionService.removeMany({
      items: []
    });
  }
}
