import { createUnionType } from '@nestjs/graphql';
import { UserMeal } from '../meals/model/user-meal.model';
import { User } from '../user/model/user.model';

export type PageableType = typeof UserMeal | typeof User;