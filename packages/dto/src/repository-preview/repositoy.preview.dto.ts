import {  IsNotEmpty, IsString  } from 'class-validator';

export class RepositoryPreviewDto {
  id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;
}
