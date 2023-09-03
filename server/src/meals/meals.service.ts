import { Injectable } from '@nestjs/common';
import { Meal } from './interfaces/meal.interface';

@Injectable()
export class MealsService {
  getMeals(): Meal[] {
    return [];
  }
}
