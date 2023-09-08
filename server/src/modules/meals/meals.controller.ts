import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { decode } from 'src/common/utils';
import { UserMeal } from './user-meal.entity';
import { Paginated } from 'src/models/paginated.model';
import { CreateMealDto } from './dto/create-meal.dto';
import { PaginateMeals } from './dto/paginate-meals.dto';
import { MealsService } from './meals.service';

@Controller()
export class MealsController {
  constructor(private readonly mealService: MealsService) {}

  @Post('meals/:user_id')
  findAllByUserId(
    @Param('user_id') userId: string,
    @Body() paginate: PaginateMeals,
  ): Promise<Paginated<UserMeal>> {
    return this.mealService.findByUserId(decode(userId), paginate);
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
