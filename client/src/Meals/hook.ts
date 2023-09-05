import { useContext } from 'react';
import { MealContext } from './MealsProvider';

export const useMeals = () => {
  return useContext(MealContext);
};
