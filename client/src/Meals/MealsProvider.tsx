import { ReactNode, createContext, useEffect, useState } from 'react';
import { useSearchbarContext } from '../common/AppBar/hook';
import { UserMeal } from '../Meal/types';
import { _getUserDetails } from '../utils/storeMethods';

interface MealLoaderProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export const MealContext = createContext([] as UserMeal[] | null);

export const MealsProvider: React.FC<MealLoaderProps> = ({
  setIsLoading,
  children,
}) => {
  const searchTerm = useSearchbarContext();
  const { id: userId } = _getUserDetails();

  const [meals, setMeals] = useState<UserMeal[] | null>(null);

  useEffect(() => {
    fetch(`http://localhost:3000/meals/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ searchTerm: searchTerm }),
    })
      .then(res => res.json())
      .then(val => {
        setMeals(val);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [searchTerm]);

  return <MealContext.Provider value={meals}>{children}</MealContext.Provider>;
};
