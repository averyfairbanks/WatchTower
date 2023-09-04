import { useEffect } from 'react';
import { Text } from 'react-native-paper';
import { useParams } from 'react-router-native';
import { encode } from '../utils/encoding';
import { _getUserDetails } from '../utils/storeMethods';

export const Meal: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const encodedMealId = id ? encode(id) : '';
    
    const { id: userId } = _getUserDetails(); 

    useEffect(() => {
        fetch(`http://localhost:3000/meals/${userId}/${encodedMealId}`, {
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

    return <Text>Hello I am a Meal with id {id}</Text>;
};
