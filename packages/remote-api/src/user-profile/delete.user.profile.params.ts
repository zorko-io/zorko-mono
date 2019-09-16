import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserProfileParams {
  readonly id: string;
}
