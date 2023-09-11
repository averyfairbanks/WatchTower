import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PageDetails {
  @Field()
  hasForward: boolean;

  @Field()
  hasBackward: boolean;

  @Field()
  total: number;
}

export default function Paginated<TItem extends Object>(
  TItemClass: Type<TItem>,
) {
  @ObjectType()
  abstract class PaginatedResponseClass {
    @Field(() => [TItemClass])
    entities: TItem[];

    @Field(() => PageDetails)
    pageDetails: PageDetails;
  }
  return PaginatedResponseClass;
}
