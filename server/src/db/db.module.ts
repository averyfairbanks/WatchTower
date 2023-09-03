
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserMeal } from './entities/user-meal.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'watchtower',
      entities: [User, UserMeal],
      synchronize: true,
    }),
  ],
  exports: [TypeOrmModule.forFeature([UserMeal])]
})
export class DbModule {}