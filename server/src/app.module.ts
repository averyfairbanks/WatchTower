import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMeal } from './modules/meals/user-meal.entity';
import { InitialSchema1693836854437 as InitialSchema } from './db/migrations/1693836854437-InitialSchema';
import { MealsModule } from './modules/meals/meals.modules';
import { User } from './modules/user/user.entity';
import { S3Module } from './modules/s3/s3.module';

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
    S3Module,
  ],
})
export class AppModule {}
