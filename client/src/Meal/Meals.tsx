import { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
    ActivityIndicator,
    Avatar,
    Badge,
    Card,
    Text,
} from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { Meal } from './types';

export const Meals: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [meals, setMeals] = useState<Meal[] | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/meals', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
        })
            .then(res => res.json())
            .then(val => {
                setMeals(val);
                setIsLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{ padding: 5 }}
            alwaysBounceVertical={true}>
            <View>
                {!isLoading && meals ? (
                    meals.map((meal, idx) => (
                        <Card
                            key={meal.id}
                            onPress={() => navigate(`/meal/${meal.id}`)}>
                            <Card.Title
                                title="Most Recent Meal"
                                titleVariant="titleLarge"
                                left={props => (
                                    <Avatar.Icon {...props} icon="food" />
                                )}
                                right={() => <Badge />}
                                rightStyle={{ margin: 10 }}
                            />
                            {idx === 0 && (
                                <Card.Cover
                                    source={{
                                        uri: meal.photoUrl.toString(),
                                    }}
                                    style={{ margin: 5 }}
                                />
                            )}
                            <Card.Content>
                                <Text variant="titleLarge">{meal.name}</Text>
                                <Text variant="bodyMedium">
                                    {meal.timeLogged.toLocaleString()}
                                </Text>
                            </Card.Content>
                        </Card>
                    ))
                ) : (
                    <ActivityIndicator />
                )}
            </View>
        </ScrollView>
    );
};
