import { useTheme } from 'react-native-paper';
import { Meals } from '../Meals/Meals';

export const Home: React.FC = () => {
  const theme = useTheme();

  return <Meals />;
};
