import { useContext } from 'react';
import { MealContext, OffsetContext } from './src/MealsProvider';

export const useMeals = () => {
  return useContext(MealContext);
};

export const useOffset = () => {
  return useContext(OffsetContext);
};
