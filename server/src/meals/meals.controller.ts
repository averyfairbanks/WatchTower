import { Controller, Get } from '@nestjs/common';
import { MealsService } from './meals.service';
import { Meal } from './interfaces/meal.interface';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealService: MealsService) {}

  @Get()
  getMeals(): Meal[] {
    return this.mealService.getMeals();
  }
}