import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  Body,
  ClassSerializerInterceptor,
  Controller, ForbiddenException,
  Get,
  NotFoundException,
  Param, Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileService } from './user.profile.service';
import { CreateUserProfileDto, UserProfileDto } from '@zorko/dto';

@ApiBearerAuth()
@ApiUseTags('user-profiles')
@Controller('user-profiles')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get(':login')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiImplicitParam({name: 'login', required: true})
  async findOneByLogin(@Param('login') login): Promise<UserProfileDto> {
    let userProfile = await this.userProfileService.findOne({
      login: login
    });

    if (!userProfile){
      throw new NotFoundException(`Can\`t find user profile with #login: ${login}`);
    }

    return userProfile
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createOne(@Body() payload: CreateUserProfileDto){
    let userProfileId;

    try {
      userProfileId = await this.userProfileService.createOne(payload);
    } catch (e) {
       throw new ForbiddenException(e.message);
    }

    return userProfileId;
  }
}
