import { IsNumber, IsString } from 'class-validator';

export class PaginateSearch {
  @IsString()
  readonly searchTerm: string;

  @IsNumber()
  readonly pageLimit: number;

  @IsNumber()
  readonly page: number;
}
