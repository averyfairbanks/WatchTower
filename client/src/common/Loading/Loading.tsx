import { VStack } from '@react-native-material/core';
import { ActivityIndicator } from 'react-native-paper';

export const Loading: React.FC = () => {
  return (
    <VStack fill center>
      <ActivityIndicator size={150} />
    </VStack>
  );
};
