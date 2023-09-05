import { Fragment, useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  ActivityIndicator,
  Avatar,
  Badge,
  Button,
  Card,
  FAB,
  Text,
} from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { UserMeal } from './types';
import { VStack } from '@react-native-material/core';
import { _getUserDetails } from '../utils/storeMethods';
import { encode } from '../utils/encoding';
import { useAppbarContext } from '../common/AppBar/hook';

export const Meals: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [meals, setMeals] = useState<UserMeal[] | null>(null);
  const { id: userId } = _getUserDetails();
  const searchTerm = useAppbarContext();

  useEffect(() => {
    fetch(`http://localhost:3000/meals/${userId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({ searchTerm }),
    })
      .then(res => res.json())
      .then(val => {
        setMeals(val);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, [searchTerm]);

  return !isLoading ? (
    meals && meals.length ? (
      <Fragment>
        <ScrollView
          contentContainerStyle={{ padding: 5 }}
          alwaysBounceVertical={true}>
          <VStack fill spacing={8}>
            {meals.map((meal, idx) => {
              const convDateTime = new Date(meal.timeLogged).toLocaleString();

              return (
                <Card
                  key={meal.id}
                  onPress={() => navigate(`/meal/${encode(String(meal.id))}`)}>
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
                        <Text variant="titleLarge">{meal.name}</Text>
                      )
                    }
                    subtitle={
                      idx === 0 ? undefined : <Text>{convDateTime}</Text>
                    }
                    left={props => <Avatar.Icon {...props} icon="food" />}
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
                      <Text variant="bodyMedium">{convDateTime}</Text>
                    </Card.Content>
                  )}
                </Card>
              );
            })}
          </VStack>
        </ScrollView>
        <FAB
          icon="plus"
          style={{
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
          }}
          onPress={() => {
            navigate('/meal/create');
          }}
        />
      </Fragment>
    ) : !searchTerm && !meals ? (
      <VStack fill center spacing={15}>
        <Avatar.Icon icon="gauge-empty" />
        <VStack center>
          <Text variant="bodyLarge">
            Looks like you haven't added any meals...
          </Text>
          <Text variant="bodyLarge">Let's fix that!</Text>
        </VStack>
        <Button mode="text">Add Meal</Button>
      </VStack>
    ) : (
      <VStack fill center spacing={15}>
        <Avatar.Icon icon="gauge-empty" />
        <VStack center>
          <Text variant="bodyLarge">Nothing here...</Text>
        </VStack>
      </VStack>
    )
  ) : (
    <VStack fill center>
      <ActivityIndicator size={150} />
    </VStack>
  );
};
