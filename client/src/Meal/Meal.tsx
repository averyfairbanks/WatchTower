import { useEffect } from 'react';
import { Text } from 'react-native-paper';
import { useParams } from 'react-router-native';
import { _getUserDetails } from '../utils/storeMethods';

export const Meal: React.FC = () => {
    const { id: mealId } = useParams<{ id: string }>();
    const { id: userId } = _getUserDetails();

    useEffect(() => {
        fetch(`http://localhost:3000/meal/${userId}/${mealId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then(res => res.json())
            .then(val => {
                console.log(val);
            })
            .catch(err => console.error(err));
    }, []);

    return <Text>Hello I am a Meal with id {mealId}</Text>;
};
