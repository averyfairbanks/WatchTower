import { Module } from '@nestjs/common';
import { MealsModule } from './meals/meals.modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './db/entities/user.entity';
import { UserMeal } from './db/entities/user-meal.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'watchtower',
      schema: 'public',
      autoLoadEntities: true,
      entities: [User, UserMeal],
      logging: 'all',
      synchronize: false,
    }),
    MealsModule,
  ],
})
export class AppModule {}
