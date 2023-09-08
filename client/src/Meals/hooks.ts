import { useContext } from 'react';
import { MealContext, OffsetContext } from './MealsProvider';

export const useMeals = () => {
  return useContext(MealContext);
};

export const useOffset = () => {
  return useContext(OffsetContext);
};
