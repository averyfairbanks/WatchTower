import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { MealsService } from './meals.service';
import { UserMeal } from 'src/db/entities/user-meal.entity';
import { decode } from 'src/utils';
import { CreateMealDto } from './dto/create-meal.dto';

@Controller()
export class MealsController {
  constructor(private readonly mealService: MealsService) {}

  @Get('meals/:user_id')
  findAllByUserId(@Param('user_id') userId: string): Promise<UserMeal[]> {
    return this.mealService.findByUserId(decode(userId));
  }

  @Get('meal/:user_id/:meal_id')
  findOneMealById(
    @Param('user_id') userId: string,
    @Param('meal_id') mealId: string,
  ): Promise<UserMeal> {
    return this.mealService.findOneById(decode(userId), decode(mealId));
  }

  @Post('meal/create')
  createNewMeal(@Body() createMealDto: CreateMealDto): Promise<UserMeal> {
    return this.mealService.createNewMeal(createMealDto);
  }
}
