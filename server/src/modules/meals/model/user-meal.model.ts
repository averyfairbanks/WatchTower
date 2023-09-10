import { Field, ObjectType } from '@nestjs/graphql';
import Paginated from 'src/models/paginated-results.model';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType({ description: 'Represents meal details logged by users' })
export class UserMeal {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'user_id' })
  userId: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column({ name: 'photo_url' })
  photoUrl: string;

  @Field()
  @Column({ name: 'time_logged' })
  timeLogged: Date;

  @Field({ defaultValue: false })
  @Column({ default: false })
  notified: boolean;
}

@ObjectType()
export class PaginatedUserMeals extends Paginated(UserMeal) {}
