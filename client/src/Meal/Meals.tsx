import { VStack } from '@react-native-material/core';
import { useState } from 'react';
import {
    ActivityIndicator,
    Avatar,
    Button,
    Text
} from 'react-native-paper';
import { useSearchbarContext } from '../common/AppBar/hook';
import { MealCards } from './MealCards';
import { MealProvider as Provider } from './MealLoader';
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
      return (
        <VStack fill center>
          <ActivityIndicator size={150} />
        </VStack>
      );
    case false:
      switch (meals && !!meals.length) {
        case true:
          return <MealCards meals={meals} loading={loading} />;
        case false:
          switch (!searchTerm && !meals) {
            case true:
              return (
                <VStack fill center spacing={15}>
                  <Avatar.Icon icon="gauge-empty" />
                  <VStack center>
                    <Text variant="bodyLarge">
                      Looks like you haven't added any meals...
                    </Text>
                    <Text variant="bodyLarge">Let's fix that!</Text>
                  </VStack>
                  <Button mode="text">Add Meal</Button>
                </VStack>
              );
            case false:
              return (
                <VStack fill center spacing={15}>
                  <Avatar.Icon icon="gauge-empty" />
                  <VStack center>
                    <Text variant="bodyLarge">Nothing here...</Text>
                  </VStack>
                </VStack>
              );
          }
      }
  }
};

export const MealsWrapper: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <Provider setIsLoading={setIsLoading}>
      <Meals loading={{ get: isLoading, set: setIsLoading }} />
    </Provider>
  );
};
