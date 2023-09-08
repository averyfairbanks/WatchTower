import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { decode } from 'src/common/utils';
import { Paginated } from 'src/models/paginated-results.model';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import { PaginateSearch } from '../../models/paginated-search.dto';
import {
  GetPagingDetailsDto,
  Where,
} from '../pagination/dto/get-paging-details.dto';
import { PaginationService } from '../pagination/pagination.service';
import { UserService } from '../user/user.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { UserMeal } from './user-meal.entity';
import { IsNumber } from 'class-validator';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(UserMeal)
    private readonly userMealRepo: Repository<UserMeal>,
    private readonly userService: UserService,
    private readonly paginationService: PaginationService,
  ) {}

  /**
   * Find a single UserMeal by user.id and user_meal.id
   * @param userId 
   * @param mealId 
   * @returns 
   */
  findOneById(userId: number, mealId: number): Promise<UserMeal> {
    return this.userMealRepo.findOneBy({ userId, id: mealId });
  }

  /**
   * Find all UserMeals by user.id
   * @param userId - user_meal.id
   * @param paginate - details for paginating the response
   * @returns - Promise of Paginated<UserMeals>
   */
  async findAllByUserId(
    userId: number,
    paginate: PaginateSearch,
  ): Promise<Paginated<UserMeal>> {
    const { searchTerm } = paginate;

    const getPagingDetailsDto: GetPagingDetailsDto =
      this.buildGetPagingDetailsDto(userId, searchTerm);

    const { min, max, total } =
      await this.paginationService.getPagingDetails(getPagingDetailsDto);

    const options = this.buildFindOptions(userId, paginate);
    const meals = await this.userMealRepo.find(options);

    const paginatedMeals: Paginated<UserMeal> = {
      entities: meals,
      pageDetails: {
        hasForward: meals[meals.length - 1]?.id > min,
        hasBackward: meals[0]?.id < max,
        total,
      },
    };

    return paginatedMeals;
  }

  /**
   * Create new user_meal table row
   * @param createMealDto 
   * @returns 
   */
  async createNewMeal(createMealDto: CreateMealDto): Promise<UserMeal> {
    const userId = decode(createMealDto.userId);
    const user = await this.userService.findUserById(userId).then((user) => {
      if (user === null) {
        const errMsg = `User with id ${userId} was not found`;
        throw new HttpException(errMsg, HttpStatus.NOT_FOUND);
      }

      return user;
    });

    const { name, description, photoUrl } = createMealDto;

    const userMeal: Partial<UserMeal> = {
      userId: user.id,
      name,
      description,
      photoUrl: `${process.env.REACT_APP_PHOTO_HOST}/${photoUrl}`,
    };

    return this.userMealRepo.save(userMeal);
  }

  private buildGetPagingDetailsDto(
    userId: number,
    searchTerm: string,
  ): GetPagingDetailsDto {
    const wheres = this.buildWheres(userId, searchTerm);

    return {
      type: UserMeal,
      tableName: 'user_meal',
      wheres,
    };
  }

  private buildWheres(userId: number, searchTerm: string): Where[] {
    // build pagination request starting with where statements
    const wheres: Where[] = [
      { whereStatement: 'user_meal.user_id = :userId', argument: { userId } },
    ];

    if (searchTerm) {
      wheres.push({
        whereStatement: "user_meal.name ilike ('%' || :searchTerm || '%')",
        argument: { searchTerm },
      });
    }

    return wheres;
  }

  private buildFindOptions(
    userId: number,
    paginate: PaginateSearch,
  ): FindManyOptions<UserMeal> {
    const { searchTerm, page: offset, pageLimit } = paginate;
    const pageOffset = (offset - 1) * pageLimit;

    return {
      where: {
        userId,
        name: searchTerm ? ILike(`%${searchTerm}%`) : undefined,
      },
      order: {
        id: 'DESC',
      },
      take: pageLimit ? pageLimit : undefined,
      skip: pageOffset ? pageOffset : undefined,
    };
  }
}
