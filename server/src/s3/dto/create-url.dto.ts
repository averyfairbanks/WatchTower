import { IsString } from 'class-validator';

export class CreatePutUrlDto {
  @IsString()
  userId: string;

  @IsString()
  type: string;

  @IsString()
  filename: string;
}

export class CreateGetUrlDto {
  @IsString()
  userId: string;

  @IsString()
  filename: string;
}

