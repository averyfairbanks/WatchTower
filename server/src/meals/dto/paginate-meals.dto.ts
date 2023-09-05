import { IsNumber, IsString } from 'class-validator';

export class PaginateMeals {
  @IsString()
  readonly searchTerm: string;

  @IsNumber()
  readonly pageLimit: number;

  @IsNumber()
  readonly offset: number;
}
