import { Text } from 'react-native-paper';
import { useParams } from 'react-router-native';

export const Meal: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);

    return <Text>Hello I am a Meal with id {id}</Text>;
};
