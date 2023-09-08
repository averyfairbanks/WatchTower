import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { decode } from 'src/common/utils';
import { Paginated } from 'src/models/paginated.model';
import { PagingDetails } from 'src/models/paging-details.model';
import { User } from 'src/modules/user/user.entity';
import { DataSource, ILike, Repository } from 'typeorm';
import { UserMeal } from './user-meal.entity';
import { CreateMealDto } from './dto/create-meal.dto';
import { PaginateMeals } from './dto/paginate-meals.dto';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(UserMeal)
    private readonly userMealRepo: Repository<UserMeal>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  async findByUserId(
    userId: number,
    paginate: PaginateMeals,
  ): Promise<Paginated<UserMeal>> {
    const { searchTerm, pageLimit, offset } = paginate;
    const { min, max, total } = await this.getPagingDetails(userId, searchTerm);

    const pageOffset = (offset - 1) * pageLimit;

    const meals = await this.userMealRepo.find({
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

    const paginatedMeals: Paginated<UserMeal> = {
      entities: meals,
      pageDetails: {
        hasForward: meals[meals.length - 1]?.id > min,
        hasBackward: meals[0]?.id < max,
        total: total,
      },
    };

    return paginatedMeals;
  }

  getPagingDetails(userId: number, searchTerm: string): Promise<PagingDetails> {
    const qb = this.dataSource
      .createQueryBuilder()
      .select('min(id)', 'min')
      .addSelect('max(id)', 'max')
      .addSelect('count(id)', 'total')
      .from(UserMeal, 'user_meal')
      .where('user_meal.user_id = :userId', {
        userId,
      });

    if (searchTerm) {
      qb.andWhere('user_meal.name ilike :searchTerm', { searchTerm });
    }

    return qb.getRawOne();
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

    const { name, description, photoUrl } = createMealDto;

    const userMeal: Partial<UserMeal> = {
      userId: user.id,
      name,
      description,
      photoUrl: `${process.env.REACT_APP_PHOTO_HOST}/${photoUrl}`,
    };

    return this.userMealRepo.save(userMeal);
  }
}
