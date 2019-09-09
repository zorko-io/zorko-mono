import { RemoteUserProfileApi } from '@zorko/remote-api';
import { UserProfileDto, UserProfileSearchParamsDto } from '@zorko/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProfileService implements RemoteUserProfileApi {
  async findOne(params: UserProfileSearchParamsDto): Promise<UserProfileDto> {
    return {
      id: 'bobobo'
    };
  }

}
