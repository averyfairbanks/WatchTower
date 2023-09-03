import { Controller, Get } from '@nestjs/common';
import { MealsService } from './meals.service';

@Controller('meals')
export class MealsController {
  constructor(private readonly appService: MealsService) {}

  @Get()
  getMeals(): string {
    return this.appService.getMeals();
  }
}