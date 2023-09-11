import { VStack } from '@react-native-material/core';
import { Avatar, Text } from 'react-native-paper';

const DEFAULT_ERROR_MSG = `Uh oh... looks like we experienced a serious error. 
Please try again later, sorry!`;

export const ErrorPage: React.FC<{ message?: string }> = ({
  message = DEFAULT_ERROR_MSG,
}) => {
  return (
    <VStack fill center spacing={15}>
      <Avatar.Icon icon="alert" />
      <VStack center>
        <Text variant="bodyLarge" style={{ textAlign: 'center' }}>
          {message}
        </Text>
      </VStack>
    </VStack>
  );
};
