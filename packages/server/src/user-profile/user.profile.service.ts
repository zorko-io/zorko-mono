import { RemoteUserProfileApi } from '@zorko/remote-api';
import {
  UserProfileDto,
  UserProfileSearchParamsDto,
  UserProfile
} from '@zorko/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProfileService implements RemoteUserProfileApi {
  async findOne(params: UserProfileSearchParamsDto): Promise<UserProfileDto> {

    if (params.login === 'test') {

      const userProfile = new UserProfile(
        '321323123',
        'test'
      );

      userProfile.getPickedRepositories().setItems([]);

      return userProfile.toDTO();
    }

    return null;

  }

}
