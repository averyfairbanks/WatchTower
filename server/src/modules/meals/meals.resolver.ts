import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateMealInput } from './dto/create-meal.args';
import { UserMealArgs } from './dto/user-meals.args';
import { MealsService } from './meals.service';
import { PaginatedUserMeals, UserMeal } from './model/user-meal.model';

const pubSub = new PubSub();
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

@Resolver()
export class MealResolver {
  constructor(private readonly mealsService: MealsService) {}

  @Query(() => PaginatedUserMeals)
  async meals(@Args() args: UserMealArgs): Promise<PaginatedUserMeals> {
    return this.mealsService.findAllByUserId(args);
  }

  @Query(() => UserMeal)
  async meal(@Args('userId') userId: string, @Args('mealId') mealId: string): Promise<UserMeal> {
    return this.mealsService.findOneWithIds(userId, mealId);
  }

  @Mutation(() => UserMeal)
  async logMeal(@Args('input') args: CreateMealInput): Promise<UserMeal> {
    const newMeal = await this.mealsService.createNewMeal(args);
    wait(3000).then(() =>
      pubSub.publish('mealLogged', { mealLogged: newMeal }),
    );
    return newMeal;
  }

  @Subscription(() => UserMeal)
  mealLogged() {
    return pubSub.asyncIterator('mealLogged');
  }
}
