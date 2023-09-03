import { useParams } from 'react-router-native';

export const Meal: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    console.log(id);

    return null;
};
