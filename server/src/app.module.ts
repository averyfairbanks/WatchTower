import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { InitialSchema1693836854437 as InitialSchema } from './db/migrations/1693836854437-InitialSchema';
import { MealsModule } from './modules/meals/meals.modules';
import { UserMeal } from './modules/meals/model/user-meal.model';
import { PaginationModule } from './modules/pagination/pagination.module';
import { S3Module } from './modules/s3/s3.module';
import { User } from './modules/user/model/user.model';
import { UserModule } from './modules/user/user.module';

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
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/gql/schema.gql'),
      sortSchema: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
    MealsModule,
    PaginationModule,
    UserModule,
    S3Module,
  ],
})
export class AppModule {}
