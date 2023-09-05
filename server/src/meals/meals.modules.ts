import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMeal } from 'src/db/entities/user-meal.entity';
import { User } from 'src/db/entities/user.entity';
import { MealsController } from './meals.controller';
import { MealsService } from './meals.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserMeal])],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
