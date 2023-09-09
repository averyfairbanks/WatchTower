import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { decode } from 'src/common/utils';
import { CreateMealInput } from './dto/create-meal.args';
import { UserMealArgs } from './dto/user-meals.args';
import { MealsService } from './meals.service';
import { PaginatedUserMeals, UserMeal } from './model/user-meal.model';

@Resolver()
export class MealResolver {
  constructor(private readonly mealsService: MealsService) {}

  @Query(() => PaginatedUserMeals)
  async meals(@Args() args: UserMealArgs): Promise<PaginatedUserMeals> {
    return this.mealsService.findAllByUserId(args);
  }

  @Query(() => UserMeal)
  async meal(@Args('userId') userId: string, @Args('mealId') mealId: number) {
    const _userId = decode(userId);
    return this.mealsService.findOneWithIds(_userId, mealId);
  }

  @Mutation(() => UserMeal)
  async logMeal(@Args('input') args: CreateMealInput): Promise<UserMeal> {
    return this.mealsService.createNewMeal(args);
  }
}
