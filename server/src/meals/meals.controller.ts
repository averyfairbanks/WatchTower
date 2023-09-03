import { Controller, Get } from '@nestjs/common';
import { MealsService } from './meals.service';
import { Meal } from './interfaces/meal.interface';
import { UserMeal } from 'src/db/entities/user-meal.entity';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealService: MealsService) {}

  @Get(':id')
  getUserMealsByUserId(id: number): Promise<UserMeal[]> {
    console.warn('hello', id)
    return this.mealService.findAllByUserId(id);
  }
}
