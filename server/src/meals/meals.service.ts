import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMeal } from '../db/entities/user-meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { User } from 'src/db/entities/user.entity';
import { decode } from 'src/utils';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(UserMeal)
    private readonly userMealRepo: Repository<UserMeal>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findByUserId(userId: number): Promise<UserMeal[]> {
    return this.userMealRepo.find({
      where: {
        userId,
      },
      order: {
        id: 'DESC',
      },
    });
  }

  findOneById(userId: number, mealId: number): Promise<UserMeal> {
    return this.userMealRepo.findOneBy({ userId, id: mealId });
  }

  createNewMeal(createMealDto: CreateMealDto): Promise<UserMeal> {
    return this.userRepo
      .findOneBy({ id: decode(createMealDto.userId) })
      .then((user) => {
        const userMeal = new UserMeal()
          .setUserId(user.id)
          .setName(createMealDto.name)
          .setDescription(createMealDto.description)
          .setPhotoUrl(createMealDto.photoUrl);
        return this.userMealRepo.save(userMeal).catch((err) => {
          const error = err as Error;
          throw new HttpException(
            `Error inserting new user_meal: ${error.message}`,
            HttpStatus.BAD_REQUEST,
          );
        });
      })
      .catch((err) => {
        const error = err as Error;
        throw new HttpException(
          `Error inserting new user_meal: ${error.message}`,
          HttpStatus.PRECONDITION_FAILED,
        );
      });
  }
}
