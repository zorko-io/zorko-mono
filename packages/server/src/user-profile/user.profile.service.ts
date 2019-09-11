import { RemoteUserProfileApi } from '@zorko/remote-api';
import { UserProfileDto, UserProfileSearchParamsDto, RepositoryPreviewCollection } from '@zorko/dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserProfileService implements RemoteUserProfileApi {
  async findOne(params: UserProfileSearchParamsDto): Promise<UserProfileDto> {

    if (params.login === 'test') {

      const pickedRepos = new RepositoryPreviewCollection().toDTO();

      return {
        id: '321323123',
        login: 'test',
        pickedRepositories: pickedRepos,
      };
    }

    return null;

  }

}
