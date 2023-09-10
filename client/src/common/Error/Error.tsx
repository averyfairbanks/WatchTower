import { VStack } from '@react-native-material/core';
import { Avatar, Text } from 'react-native-paper';

export const ErrorPage: React.FC = () => {
  return (
    <VStack fill center spacing={15}>
      <Avatar.Icon icon="alert" />
      <VStack center>
        <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
          Uh oh... looks like we experienced an serious error. Please try again
          later, sorry!
        </Text>
      </VStack>
    </VStack>
  );
};
