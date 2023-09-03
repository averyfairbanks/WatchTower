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
      {
        id: 2,
        name: 'Rice and beans',
        description: 'made me shid and fard',
        photoUrl: new URL('https://picsum.photos/900'),
        timeLogged: new Date(),
        notified: true,
      },
      {
        id: 3,
        name: 'Rice and beans',
        description: 'made me shid and fard',
        photoUrl: new URL('https://picsum.photos/900'),
        timeLogged: new Date(),
        notified: true,
      },
      {
        id: 4,
        name: 'Rice and beans',
        description: 'made me shid and fard',
        photoUrl: new URL('https://picsum.photos/900'),
        timeLogged: new Date(),
        notified: false,
      },
      {
        id: 5,
        name: 'Rice and beans',
        description: 'made me shid and fard',
        photoUrl: new URL('https://picsum.photos/900'),
        timeLogged: new Date(),
        notified: true,
      },
      {
        id: 6,
        name: 'Rice and beans',
        description: 'made me shid and fard',
        photoUrl: new URL('https://picsum.photos/900'),
        timeLogged: new Date(),
        notified: true,
      },
      {
        id: 7,
        name: 'Rice and beans',
        description: 'made me shid and fard',
        photoUrl: new URL('https://picsum.photos/900'),
        timeLogged: new Date(),
        notified: true,
      },
      {
        id: 8,
        name: 'Rice and beans',
        description: 'made me shid and fard',
        photoUrl: new URL('https://picsum.photos/900'),
        timeLogged: new Date(),
        notified: true,
      },
      {
        id: 9,
        name: 'Rice and beans',
        description: 'made me shid and fard',
        photoUrl: new URL('https://picsum.photos/900'),
        timeLogged: new Date(),
        notified: true,
      },
    ];
  }
}
