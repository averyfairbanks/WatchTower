import { Injectable } from '@nestjs/common';
import { Meal } from './interfaces/meal.interface';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMeal } from 'src/db/entities/user-meal.entity';
import { User } from 'src/db/entities/user.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(UserMeal) private userMealRepo: Repository<UserMeal>,
  ) {}

  findAllByUserId(id: number): Promise<UserMeal[]> {
    return this.userMealRepo.findBy({ userId: id });
  }
}
