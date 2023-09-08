import { useState } from 'react';
import { Loading } from '../../common/Loading/Loading';
import { NoResults } from '../../common/NoResultsPage.tsx/NoResults';
import { useMeals } from '../hooks';
import { MealCards } from './MealCards';
import { MealsProvider } from './MealsProvider';

const Meals: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  const pagedMeals = useMeals();

  const meals = pagedMeals?.entities ? pagedMeals.entities : [];
  const total = pagedMeals?.pageDetails?.total ?? 0;

  switch (isLoading) {
    case true:
      return <Loading />;
    case false:
      switch (meals && meals.length > 0) {
        case true:
          return <MealCards meals={meals} />;
        case false:
          return <NoResults noMeals={!!total || total === 0} />;
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
