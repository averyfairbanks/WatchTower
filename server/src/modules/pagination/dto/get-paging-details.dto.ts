import { UserMeal } from 'src/modules/meals/model/user-meal.model';
import { User } from 'src/modules/user/model/user.model';

export type PageableType = typeof UserMeal | typeof User;

export interface GetPagingDetailsDto {
  type: PageableType;
  tableName: string;
  wheres: Where[];
}

export interface Where {
  argument: { [key: string]: any };
  whereStatement: string;
}
