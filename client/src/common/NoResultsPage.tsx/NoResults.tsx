import { VStack } from '@react-native-material/core';
import { Avatar, Text, Button } from 'react-native-paper';

export const NoResults: React.FC<{ noMeals: boolean }> = ({ noMeals }) => {
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
      {noMeals && <Button mode="text">Add Meal</Button>}
    </VStack>
  );
};
