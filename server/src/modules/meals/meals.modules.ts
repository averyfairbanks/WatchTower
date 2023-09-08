import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMeal } from './user-meal.entity';
import { User } from 'src/modules/user/user.entity';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { UserService } from '../user/user.service';
import { PaginationService } from '../pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserMeal])],
  controllers: [MealsController],
  providers: [MealsService, UserService, PaginationService],
})
export class MealsModule {}
