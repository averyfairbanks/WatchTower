import { VStack } from '@react-native-material/core';
import { ScrollView } from 'react-native';
import { Avatar, Badge, Card, Text, useTheme } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { UserMeal } from '../Meal/types';
import { encode } from '../utils/encoding';

interface MealCardsProps {
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
  const onFirstPage = idx === 0 && page === 1;

  return (
    <Card
      style={{ marginBottom: 8 }}
      onPress={() => navigate(`/meal/${encode(String(meal.id))}`)}>
      <Card.Title
        title={
          onFirstPage ? (
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
        subtitle={onFirstPage ? undefined : <Text>{convDateTime}</Text>}
        left={props => <Avatar.Icon {...props} icon="food" />}
        right={meal.notified ? undefined : () => <Badge />}
        rightStyle={{ margin: 10 }}
      />
      {onFirstPage && (
        <Card.Cover
          source={{
            uri: meal.photoUrl.toString(),
          }}
          style={{ margin: 5 }}
        />
      )}
      {onFirstPage && (
        <Card.Content>
          <Text variant="titleLarge">{meal.name}</Text>
          <Text variant="bodyMedium">{convDateTime}</Text>
        </Card.Content>
      )}
    </Card>
  );
};

export const MealCards: React.FC<MealCardsProps> = ({
  scrollRef,
  meals,
  page,
}) => {
  const { colors } = useTheme();
  const navigate = useNavigate();

  // TODO: clean this mess up
  return (
    // <ScrollView
    //   ref={scrollRef as LegacyRef<ScrollView>}
    //   contentContainerStyle={{
    //     padding: 5,
    //     flexGrow: 1,
    //     backgroundColor: colors.background,
    //   }}
    //   keyboardDismissMode="on-drag"
    //   alwaysBounceVertical={true}>
    <VStack fill spacing={8} mb={85}>
      {/* {meals &&
          meals.map((meal, idx) => {
            const convDateTime = new Date(meal.timeLogged).toLocaleString();
            const onFirstPage = idx === 0 && page === 1;

            return (
              <Card
                key={idx}
                onPress={() => navigate(`/meal/${encode(String(meal.id))}`)}>
                <Card.Title
                  title={
                    onFirstPage ? (
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
                    onFirstPage ? undefined : <Text>{convDateTime}</Text>
                  }
                  left={props => <Avatar.Icon {...props} icon="food" />}
                  right={meal.notified ? undefined : () => <Badge />}
                  rightStyle={{ margin: 10 }}
                />
                {onFirstPage && (
                  <Card.Cover
                    source={{
                      uri: meal.photoUrl.toString(),
                    }}
                    style={{ margin: 5 }}
                  />
                )}
                {onFirstPage && (
                  <Card.Content>
                    <Text variant="titleLarge">{meal.name}</Text>
                    <Text variant="bodyMedium">{convDateTime}</Text>
                  </Card.Content>
                )}
              </Card>
            );
          })} */}
    </VStack>
    // </ScrollView>
  );
};
