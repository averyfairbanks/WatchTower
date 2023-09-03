import { Injectable } from '@nestjs/common';

@Injectable()
export class MealsService {
  getMeals(): string {
    return 'Hello World!';
  }
}
