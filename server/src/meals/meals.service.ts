import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { decode } from 'src/utils';
import { ILike, Repository } from 'typeorm';
import { UserMeal } from '../db/entities/user-meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
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
        name: searchTerm ? ILike(`%${searchTerm}%`) : undefined,
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

  async createNewMeal(createMealDto: CreateMealDto): Promise<UserMeal> {
    const user = await this.userRepo.findOneBy({
      id: decode(createMealDto.userId),
    });

    if (user === null) {
      const errMsg = `User with id ${createMealDto.userId} was not found`;
      throw new HttpException(errMsg, HttpStatus.NOT_FOUND, {
        cause: new Error(errMsg),
        description: errMsg,
      });
    }

    const userMeal = new UserMeal()
      .setUserId(user.id)
      .setName(createMealDto.name)
      .setDescription(createMealDto.description)
      .setPhotoUrl(createMealDto.photoUrl);

    return this.userMealRepo.save(userMeal);
  }
}
