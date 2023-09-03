import { Module } from '@nestjs/common';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMeal } from 'src/db/entities/user-meal.entity';


@Module({
  imports: [TypeOrmModule.forFeature([UserMeal])],
  providers: [MealsService],
})
export class MealsModule {}