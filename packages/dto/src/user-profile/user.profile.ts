import { UserProfileDto } from './user.profile.dto';
import {
  RepositoryPreviewCollection,
} from '../repository-preview';

export class UserProfile {
  private id?: string;
  private login: string;
  private pickedRepositories: RepositoryPreviewCollection;

  constructor(login?: string, pickedRepositories?: RepositoryPreviewCollection, id?: string) {
    this.id = id;
    this.login = login ? login : '';

    if (!pickedRepositories) {
      this.pickedRepositories = new RepositoryPreviewCollection();
    } else {
      this.pickedRepositories = pickedRepositories;
    }
  }

  setLogin(login: string): this {
    this.login = login;
    return this;
  }

  setId(id: string): this {
    this.id = id;
    return this;
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
