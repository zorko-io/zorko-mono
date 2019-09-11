import { IsNotEmpty, IsString } from 'class-validator';
import { RepositoryPreviewCollectionDto } from '../repository-preview';

export class UserProfileDto {
  id: string;
  @IsString()
  @IsNotEmpty()
  login: string;
  pickedRepositories: RepositoryPreviewCollectionDto;
}
