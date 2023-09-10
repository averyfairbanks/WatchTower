import { VStack } from '@react-native-material/core';
import { Avatar, Button, Text } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import styled from 'styled-components';

const StyledText = styled(Text).attrs({ variant: 'bodyLarge' })`
  text-align: center;
`;

export const NoResults: React.FC<{ noMeals: boolean }> = ({ noMeals }) => {
  const navigate = useNavigate();

  const userMessage = noMeals
    ? "Looks like you haven't added any meals..."
    : 'Nothing here...';

  return (
    <VStack fill center spacing={15}>
      <Avatar.Icon icon="gauge-empty" />
      <VStack center>
        <StyledText>{userMessage}</StyledText>
        {noMeals && <StyledText>Let's fix that!</StyledText>}
      </VStack>
      {noMeals && (
        <Button mode="text" onPress={() => navigate('/meal/create')}>
          Add Meal
        </Button>
      )}
    </VStack>
  );
};
