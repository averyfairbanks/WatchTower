import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMeal } from '../meals/model/user-meal.model';
import { PaginationService } from './pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserMeal])],
  providers: [PaginationService],
  exports: [PaginationService],
})
export class PaginationModule {}
