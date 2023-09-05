import { useContext } from 'react';
import { MealLoader } from './MealLoader';

export const useMeals = () => {
  return useContext(MealLoader);
};