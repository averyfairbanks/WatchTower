import { VStack } from '@react-native-material/core';
import { Fragment } from 'react';
import { ScrollView } from 'react-native';
import { Avatar, Badge, Card, FAB, Text } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { UserMeal } from '../Meal/types';
import { encode } from '../utils/encoding';

interface MealCardsProps {
  meals: UserMeal[] | null;
}

export const MealCards: React.FC<MealCardsProps> = ({ meals }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      <ScrollView
        contentContainerStyle={{ padding: 5 }}
        alwaysBounceVertical={true}>
        <VStack fill spacing={8}>
          {meals &&
            meals.map((meal, idx) => {
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
  );
};
