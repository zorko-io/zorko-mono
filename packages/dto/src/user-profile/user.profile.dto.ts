import { IsNotEmpty, IsString } from 'class-validator';
import { RepositoryPreviewCollectionDto } from '../repository-preview';
import { UserProfileInterface } from './user.profile.interface';

export class UserProfileDto implements UserProfileInterface{
  id: string;
  @IsString()
  @IsNotEmpty()
  login: string;
  pickedRepositories: RepositoryPreviewCollectionDto;
}
