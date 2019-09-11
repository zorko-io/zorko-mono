import { UserProfileDto } from './user.profile.dto';
import {
  RepositoryPreviewCollection,
} from '../repository-preview';

export class UserProfile {
  private id: string;
  private login: string;
  private pickedRepositories: RepositoryPreviewCollection;

  constructor(id?: string, login?: string, pickedRepositories?: RepositoryPreviewCollection) {
    this.id = id ? id : '';
    this.login = login ? login : '';

    if (!pickedRepositories) {
      this.pickedRepositories = new RepositoryPreviewCollection();
    } else {
      this.pickedRepositories = pickedRepositories;
    }
  }

  getPickedRepositories() : RepositoryPreviewCollection {
    return this.pickedRepositories;
  }

  toDTO(): UserProfileDto {
    return {
      id: this.id,
      login: this.login,
      pickedRepositories: this.pickedRepositories.toDTO(),
    };
  }

}
