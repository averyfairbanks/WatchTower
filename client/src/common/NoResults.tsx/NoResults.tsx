import { VStack } from '@react-native-material/core';
import { Avatar, Button, Text } from 'react-native-paper';
import { useNavigate } from 'react-router-native';

export const NoResults: React.FC<{ noMeals: boolean }> = ({ noMeals }) => {
  const navigate = useNavigate();

  const userMessage = noMeals
    ? "Looks like you haven't added any meals..."
    : 'Nothing here...';

  return (
    <VStack fill center spacing={15}>
      <Avatar.Icon icon="gauge-empty" />
      <VStack center>
        <Text variant="bodyLarge">{userMessage}</Text>
        {noMeals && <Text variant="bodyLarge">Let's fix that!</Text>}
      </VStack>
      {noMeals && (
        <Button mode="text" onPress={() => navigate('/meal/create')}>
          Add Meal
        </Button>
      )}
    </VStack>
  );
};
