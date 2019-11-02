import { RepositoryPreviewCollectionDto } from '../repository-preview';
import { UserProfileInterface } from './user.profile.interface';

export class UserProfileDto implements UserProfileInterface{
  id: string;
  login: string;
  pickedRepositories?: RepositoryPreviewCollectionDto;
}
