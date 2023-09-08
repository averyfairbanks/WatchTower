import { UserMeal } from '../meals/user-meal.entity';
import { User } from '../user/user.entity';

export type PageableType = typeof UserMeal | typeof User;
