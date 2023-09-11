import { useQuery } from '@apollo/client';
import { VStack } from '@react-native-material/core';
import { Dimensions, Image, ScrollView } from 'react-native';
import { Avatar, Divider, Surface, Text, TextInput } from 'react-native-paper';
import { useParams } from 'react-router-native';
import { ErrorPage } from '../../common/Error/Error';
import { Loading } from '../../common/Loading/Loading';
import { _getUserDetails } from '../../utils/storeMethods';
import { GET_MEAL_QUERY } from './gql/GetMealQuery';
import { StyledFoodIcon } from './styled';

export const Meal: React.FC = () => {
  const { height, width } = Dimensions.get('screen');

  const { id: userId } = _getUserDetails();
  const { id: mealId } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_MEAL_QUERY, {
    variables: { userId, mealId },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage message="Error retrieving meal" />;
  }

  const { meal } = data;
  const [date, time] = new Date(meal.timeLogged)
    .toLocaleString()
    .replace(' ', '')
    .split(',');
  return (
    <ScrollView>
      {meal && (
        <>
          <Surface
            style={{
              margin: 0,
              width: width,
            }}>
            <StyledFoodIcon icon="food" />
            <Image
              source={{ uri: meal.photoUrl.toString() }}
              style={{
                width: width,
                height: height / 2.5,
              }}
            />
            <VStack m={10} spacing={5}>
              <Text variant="displaySmall">{meal.name}</Text>
              <Divider />
              <Text variant="titleSmall">
                <Text>Logged On: {date}</Text>
                <Text>
                  {'\n'}At: {time}
                </Text>
              </Text>
            </VStack>
          </Surface>
          <TextInput
            mode="flat"
            disabled={true}
            value={meal.description}
            multiline={true}
            numberOfLines={15}
          />
          <Avatar.Icon icon="delete" />
        </>
      )}
    </ScrollView>
  );
};
