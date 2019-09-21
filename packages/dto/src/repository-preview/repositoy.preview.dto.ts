import {  IsNotEmpty, IsString  } from 'class-validator';

export interface RepositoryPreviewDto {
  id: string;
  name: string;
  description: string;
}
