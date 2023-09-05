import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateMealDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly photoUrl: string;
}
