import {
  ApiBearerAuth,
  ApiImplicitParam,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserProfileService } from './user.profile.service';

@ApiBearerAuth()
@ApiUseTags('user-profiles')
@Controller('user-profiles')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiImplicitParam({name: 'id', required: true})
  async findOneById(@Param('id') params){
     return await this.userProfileService.findOne({
       id: params.id
     })
  }
}
