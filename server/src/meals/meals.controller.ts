import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { MealsService } from './meals.service';
import { UserMeal } from 'src/db/entities/user-meal.entity';

@Controller('meals')
export class MealsController {
  constructor(private readonly mealService: MealsService) {}

  @Get(':user_id')
  findAllByUserId(
    @Param('user_id', ParseIntPipe) userId: number,
  ): Promise<UserMeal[]> {
    return this.mealService.findByUserId(userId);
  }
}
