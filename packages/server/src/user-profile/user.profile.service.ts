import { RemoteUserProfileApi } from '@zorko/remote-api';
import {
  UserProfileDto,
  UserProfileSearchParamsDto,
  UserProfile,
  CreateUserProfileDto,
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

  async createOne(params: CreateUserProfileDto): Promise<string> {
    // TODO: connect to mongo and store user profile here
    // TODO: create profile during user creation ()

    throw {
      message: `Can't create user profile for #login ${params.login}, because it's already exists`
    };
  }
}
