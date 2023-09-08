import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Represents an app user' })
export class User {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}
