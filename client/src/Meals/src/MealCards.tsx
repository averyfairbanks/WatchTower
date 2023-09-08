import { VStack } from '@react-native-material/core';
import { Fragment } from 'react';
import { ScrollView } from 'react-native';
import { Avatar, Badge, Card, Text } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { UserMeal } from '../../Meal/types';
import { encode } from '../../utils/encoding';
import { useOffset } from '../hooks';

interface MealCardsProps {
  meals: UserMeal[] | null;
}

export const MealCards: React.FC<MealCardsProps> = ({ meals }) => {
  const navigate = useNavigate();
  const offset = useOffset();

  // TODO: clean this mess up
  return (
    <Fragment>
      <ScrollView
        contentContainerStyle={{ padding: 5 }}
        alwaysBounceVertical={true}>
        <VStack fill spacing={8} mb={90}>
          {meals &&
            meals.map((meal, idx) => {
              const convDateTime = new Date(meal.timeLogged).toLocaleString();

              return (
                <Card
                  key={meal.id}
                  onPress={() => navigate(`/meal/${encode(String(meal.id))}`)}>
                  <Card.Title
                    title={
                      idx === 0 && offset === 1 ? (
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
                      idx === 0 && offset === 1 ? undefined : (
                        <Text>{convDateTime}</Text>
                      )
                    }
                    left={props => <Avatar.Icon {...props} icon="food" />}
                    right={meal.notified ? undefined : () => <Badge />}
                    rightStyle={{ margin: 10 }}
                  />
                  {idx === 0 && offset === 1 && (
                    <Card.Cover
                      source={{
                        uri: meal.photoUrl.toString(),
                      }}
                      style={{ margin: 5 }}
                    />
                  )}
                  {idx === 0 && offset === 1 && (
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
    </Fragment>
  );
};
