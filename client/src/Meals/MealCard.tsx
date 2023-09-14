import { ScrollView } from 'react-native';
import { Avatar, Badge, Card, Text } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { UserMeal } from '../Meal/types';
import { encode } from '../utils/encoding';

interface MealCardProps {
  scrollRef: React.RefObject<ScrollView | undefined>;
  meals: UserMeal[] | null;
  page: number;
}

export const MealCard: React.FC<{
  meal: UserMeal;
  page: number;
  idx: number;
}> = ({ meal, page, idx }) => {
  const navigate = useNavigate();

  const convDateTime = new Date(meal.timeLogged).toLocaleString();
  const leadMeal = idx === 0 && page === 1;
  const mealUrl = `/meal/${encode(String(meal.id))}`;

  return (
    <Card
      style={{ marginBottom: 8, paddingBottom: 10 }}
      onPress={() => navigate(mealUrl)}>
      <Card.Title
        title={
          leadMeal ? (
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
        subtitle={leadMeal ? undefined : <Text>{convDateTime}</Text>}
        left={props => <Avatar.Icon {...props} icon="food" />}
        right={meal.notified ? undefined : () => <Badge />}
        rightStyle={{ margin: 10 }}
      />

      {leadMeal && (
        <>
          <Card.Cover
            source={{
              uri: meal.photoUrl,
            }}
            style={{ margin: 5 }}
          />
          <Card.Content>
            <Text variant="titleLarge">{meal.name}</Text>
            <Text variant="bodyMedium">{convDateTime}</Text>
          </Card.Content>
        </>
      )}
    </Card>
  );
};
