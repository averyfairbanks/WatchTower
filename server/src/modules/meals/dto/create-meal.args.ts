import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateMealInput {
  @Field()
  @IsNotEmpty()
  userId: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(512)
  description: string;

  @Field()
  @IsNotEmpty()
  @MaxLength(128)
  photoUrl: string;
}
