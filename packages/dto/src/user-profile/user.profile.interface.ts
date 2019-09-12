import { RepositoryPreviewCollectionDto } from '../repository-preview';

export interface UserProfileInterface {
  id?: string;
  login: string;
  pickedRepositories: RepositoryPreviewCollectionDto;
}
