import { Repository } from '@zorko/dto/lib/repository';

export class CreateRepositoryParams implements Repository {
  description: string;
  name: string;
  owner: string;
}
