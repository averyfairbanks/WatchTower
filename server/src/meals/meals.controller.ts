import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MealsService } from './meals.service';
import { UserMeal } from 'src/db/entities/user-meal.entity';
import { decode } from 'src/utils';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealService: MealsService) {}

  @Get(':user_id')
  findAllByUserId(
    @Param('user_id') userId: string,
  ): Promise<UserMeal[]> {
    return this.mealService.findByUserId(decode(userId));
  }

  @Get(':user_id/:meal_id')
  findOneMealById(
    @Param('user_id') userId: string,
    @Param('meal_id') mealId: string,
  ): Promise<UserMeal> {
    return this.mealService.findOneById(decode(userId), decode(mealId));
  }
}
