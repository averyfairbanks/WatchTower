import { useState } from 'react';
import { useSearchbarContext } from '../common/AppBar/hook';
import { Loading } from '../common/Loading/Loading';
import { NoResults } from '../common/NoResultsPage.tsx/NoResults';
import { MealCards } from './MealCards';
import { MealsProvider } from './MealsProvider';
import { useMeals } from './hook';

const Meals: React.FC<{isLoading: boolean}> = ({ isLoading }) => {
  const meals = useMeals();
  const searchTerm = useSearchbarContext();


  switch (isLoading) {
    case true:
      return <Loading />;
    case false:
      switch (meals && !!meals.length) {
        case true:
          return <MealCards meals={meals} />;
        case false:
          return <NoResults noMeals={!searchTerm} />;
      }
  }
};

export const MealsWrapper: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <MealsProvider setIsLoading={setIsLoading}>
      <Meals isLoading={isLoading} />
    </MealsProvider>
  );
};
