import { Injectable } from '@nestjs/common';
import { Meal } from './interfaces/meal.interface';

@Injectable()
export class MealsService {
  getMeals(): Meal[] {
    return [
      {
        id: 1,
        name: 'Rice and beans',
        description: 'made me shid and fard',
        photoUrl: new URL('https://picsum.photos/900'),
        timeLogged: new Date(),
        notified: false,
      },
    ];
  }
}
