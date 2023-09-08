import { PageableType } from '../types';

export interface GetPagingDetailsDto {
  type: PageableType;
  tableName: string;
  wheres: Where[];
}

export interface Where {
  argument: { [key: string]: any };
  whereStatement: string;
}
