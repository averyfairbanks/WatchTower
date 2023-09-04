import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMeal } from '../db/entities/user-meal.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(UserMeal)
    private readonly userMealRepo: Repository<UserMeal>,
  ) {}

  findByUserId(userId: number): Promise<UserMeal[]> {
    return this.userMealRepo.findBy({ userId });
  }

  findOneById(userId: number, mealId: number) {
    return this.userMealRepo.findOneBy({userId, id: mealId})
  }
}
