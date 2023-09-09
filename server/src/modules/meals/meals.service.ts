import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { decode } from 'src/common/utils';
import { PagingDetails } from 'src/models/paging-details.model';
import { FindManyOptions, ILike, Repository } from 'typeorm';
import {
  GetPagingDetailsDto,
  Where,
} from '../pagination/dto/get-paging-details.dto';
import { PaginationService } from '../pagination/pagination.service';
import { UserService } from '../user/user.service';
import { CreateMealInput } from './dto/create-meal.args';
import { UserMealArgs } from './dto/user-meals.args';
import { PaginatedUserMeals, UserMeal } from './model/user-meal.model';

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
  findOneWithIds(userId: number, mealId: number): Promise<UserMeal> {
    return this.userMealRepo.findOneBy({ userId, id: mealId });
  }

  /**
   * Find all UserMeals by user.id
   * @param userId - user_meal.id
   * @param paginate - details for paginating the response
   * @returns - Promise of Paginated<UserMeals>
   */
  async findAllByUserId(args: UserMealArgs): Promise<PaginatedUserMeals> {
    const userId = decode(args.userId);
    // will throw exception if no user is found
    this.userService.findUserById(userId);

    // paging detals request
    const getPagingDetailsDto: GetPagingDetailsDto =
      this.buildGetPagingDetailsDto(userId, args);

    // find paging details (min, max, total) of user meals
    const pageDetails =
      await this.paginationService.getPagingDetails(getPagingDetailsDto);

    // build paginated options for find() then await
    const options = this.buildFindOptions(userId, args);
    const meals = await this.userMealRepo.find(options);

    // add meals to paginated object
    const paginatedMeals = this.buildPaginatedResults(meals, pageDetails);

    return paginatedMeals;
  }

  /**
   * Create new user_meal table row
   * @param createMealDto
   * @returns
   */
  async createNewMeal(args: CreateMealInput): Promise<UserMeal> {
    const userId = decode(args.userId);
    const user = await this.userService.findUserById(userId);

    const { name, description, photoUrl } = args;

    const userMeal: Partial<UserMeal> = {
      userId: user.id,
      name,
      description,
      photoUrl: `${process.env.REACT_APP_PHOTO_HOST}/${photoUrl}`,
    };

    return this.userMealRepo.save(userMeal);
  }

  /**
   * HELPERS
   */
  private buildGetPagingDetailsDto(
    userId: number,
    args: UserMealArgs,
  ): GetPagingDetailsDto {
    const wheres = this.buildWheres(userId, args);

    return {
      type: UserMeal,
      tableName: 'user_meal',
      wheres,
    };
  }

  private buildWheres(userId: number, args: UserMealArgs): Where[] {
    const { searchTerm } = args;

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
    args: UserMealArgs,
  ): FindManyOptions<UserMeal> {
    const { searchTerm, page, pageLimit } = args;
    const pageOffset = (page - 1) * pageLimit;

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

  private buildPaginatedResults(
    meals: UserMeal[],
    pageDetails: PagingDetails,
  ): PaginatedUserMeals {
    const { min, max, total } = pageDetails;
    return {
      entities: meals,
      pageDetails: {
        hasForward: meals[meals.length - 1]?.id > min,
        hasBackward: meals[0]?.id < max,
        total,
      },
    };
  }
}
