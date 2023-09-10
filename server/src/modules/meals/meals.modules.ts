import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/user/model/user.model';
import { PaginationService } from '../pagination/pagination.service';
import { UserService } from '../user/user.service';
import { MealsService } from './meals.service';
import { UserMeal } from './model/user-meal.model';
import { MealResolver } from './meals.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserMeal])],
  providers: [MealResolver, MealsService, UserService, PaginationService],
})
export class MealsModule {}
