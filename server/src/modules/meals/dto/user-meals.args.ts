import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class UserMealArgs {
  @Field(() => String)
  userId: string;

  @Field(() => String)
  searchTerm: string = '';

  @Field(() => Int)
  @Min(1)
  @Max(20)
  pageLimit = 10;

  @Field(() => Int)
  page = 1;
}
