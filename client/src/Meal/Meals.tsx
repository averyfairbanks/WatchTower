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
import { UserMeal } from './types';
import { VStack } from '@react-native-material/core';
import { store } from '../../store';

export const Meals: React.FC = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [meals, setMeals] = useState<UserMeal[] | null>(null);

    useEffect(() => {
        fetch(`http://localhost:3000/meals/${store.getRawState().user.id}`, {
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

    return !isLoading && meals ? (
        <ScrollView
            contentContainerStyle={{ padding: 5 }}
            alwaysBounceVertical={true}>
            <VStack spacing={8}>
                {meals.map((meal, idx) => (
                    <Card
                        key={meal.id}
                        onPress={() => navigate(`/meal/${meal.id}`)}>
                        <Card.Title
                            title={
                                idx === 0 ? (
                                    <Text
                                        style={{
                                            fontSize: 30,
                                            fontWeight: '700',
                                        }}>
                                        Most Recent Meal
                                    </Text>
                                ) : (
                                    <Text variant="titleLarge">
                                        {meal.name}
                                    </Text>
                                )
                            }
                            subtitle={
                                idx === 0 ? undefined : (
                                    <Text>
                                        {new Date(
                                            meal.timeLogged,
                                        ).toLocaleString()}
                                    </Text>
                                )
                            }
                            left={props => (
                                <Avatar.Icon {...props} icon="food" />
                            )}
                            right={meal.notified ? undefined : () => <Badge />}
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
                        {idx === 0 && (
                            <Card.Content>
                                <Text variant="titleLarge">{meal.name}</Text>
                                <Text variant="bodyMedium">
                                    {new Date(meal.timeLogged).toLocaleString()}
                                </Text>
                            </Card.Content>
                        )}
                    </Card>
                ))}
            </VStack>
        </ScrollView>
    ) : (
        <VStack fill center>
            <ActivityIndicator size={150} />
        </VStack>
    );
};
