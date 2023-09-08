import { Module } from "@nestjs/common";
import { UserMeal } from "../meals/user-meal.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaginationService } from "./pagination.service";

@Module({
  imports: [TypeOrmModule.forFeature([UserMeal])],
  providers: [PaginationService],
  exports: [PaginationService],
})
export class UserModule {}
