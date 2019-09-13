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
import { UsersService } from './users.service';
import { Roles } from '../roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';

function cleanUpUserResponse (user: UserDtoInterface) {

  delete user.password;

  return user;
}

@ApiBearerAuth()
@ApiUseTags('users')
@Controller('users')
export class UsersController  {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({title: 'Create user'})
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RolesEnum.Admin)
  async createOne(@Body() createCatDto: CreateUserDto): Promise<string> {
    return await this.usersService.createOne(createCatDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async findMany(@Query() query: ListUserQuery): Promise<UserDtoInterface[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiImplicitParam({name: 'id', required: true})
  async findOne(@Param('id') id): Promise<UserDto> {
    const user = await this.usersService.findOne({ id });
    if (!user) {
      throw new NotFoundException(`Can\`t find user with #id: ${id}`);
    }
    return cleanUpUserResponse(user);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async updateOne(@Param('id') id: string, @Body() nextUser: UserDto): Promise<UserDto> {
    const user = await this.usersService.updateOne(nextUser);
    return cleanUpUserResponse(user)
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({title: 'Remove user'})
  async removeOne(@Param('id') id: string): Promise<void> {
    await this.usersService.remove(id);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(RolesEnum.Admin)
  @ApiOperation({title: 'Bulk remove users'})
  async removeMany(): Promise<number> {
    return await this.usersService.removeAll();
  }

  // TODO: find on how to diff creation of one and many
  createMany(users: CreateUserDto[] = []): Promise<string[]> {
    throw new Error('Not Implemented');
  }
}
