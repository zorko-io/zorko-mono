import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class ReadUserProfileParams {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly login?: string;
}
