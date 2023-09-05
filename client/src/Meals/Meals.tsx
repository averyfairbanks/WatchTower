import { useState } from 'react';
import { useSearchbarContext } from '../common/AppBar/hook';
import { Loading } from '../common/Loading/Loading';
import { NoResults } from '../common/NoResultsPage.tsx/NoResults';
import { MealCards } from './MealCards';
import { MealsProvider } from './MealsProvider';
import { useMeals } from './hook';

interface MealsProps {
  loading: {
    get: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const Meals: React.FC<MealsProps> = ({ loading }) => {
  const meals = useMeals();
  const searchTerm = useSearchbarContext();

  switch (loading.get) {
    case true:
      return <Loading />;
    case false:
      switch (meals && !!meals.length) {
        case true:
          return <MealCards meals={meals} loading={loading} />;
        case false:
          return <NoResults noMeals={!searchTerm && !meals} />;
      }
  }
};

export const MealsWrapper: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <MealsProvider setIsLoading={setIsLoading}>
      <Meals loading={{ get: isLoading, set: setIsLoading }} />
    </MealsProvider>
  );
};
