import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMeal } from './db/entities/user-meal.entity';
import { User } from './db/entities/user.entity';
import { InitialSchema1693836854437 as InitialSchema } from './db/migrations/1693836854437-InitialSchema';
import { MealsModule } from './meals/meals.modules';

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
      migrations: [InitialSchema],
      migrationsRun: true,
      entities: [User, UserMeal],
      logging: 'all',
      synchronize: false,
    }),
    MealsModule,
  ],
})
export class AppModule {}
