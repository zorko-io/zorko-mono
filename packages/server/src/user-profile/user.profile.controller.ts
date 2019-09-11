import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileService } from './user.profile.service';
import { UserProfileDto } from '@zorko/dto';

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
}
