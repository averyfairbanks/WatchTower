import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMeal } from '../db/entities/user-meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { User } from 'src/db/entities/user.entity';
import { decode } from 'src/utils';
import { PaginateMeals } from './dto/paginate-meals.dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(UserMeal)
    private readonly userMealRepo: Repository<UserMeal>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  findByUserId(userId: number, paginate: PaginateMeals): Promise<UserMeal[]> {
    const { searchTerm, pageLimit, offset } = paginate;
    const pageOffset = (offset - 1) * pageLimit;
    
    return this.userMealRepo.find({
      where: {
        userId,
        name: searchTerm ? Like(`%${searchTerm}%`) : undefined,
      },
      order: {
        id: 'DESC',
      },
      take: pageLimit ? pageLimit : undefined,
      skip: pageOffset ? pageOffset : undefined,
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
