import { useMutation, useQuery } from '@apollo/client';
import { VStack } from '@react-native-material/core';
import { useState } from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import {
  Divider,
  IconButton,
  Surface,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { useNavigate, useParams } from 'react-router-native';
import { ErrorPage } from '../../common/Error/Error';
import { Loading } from '../../common/Loading/Loading';
import { _getUserDetails } from '../../utils/storeMethods';
import { DeleteMealDialog } from './DeleteMealDialog';
import { DELETE_MEAL } from './gql/DeleteMealMutation';
import { GET_MEAL_QUERY } from './gql/GetMealQuery';
import { StyledFoodIcon } from './styled';

export const Meal: React.FC = () => {
  // for styling text input
  const { colors } = useTheme();

  // to exit page
  const navigate = useNavigate();

  // For setting image height/width
  const { height, width } = Dimensions.get('screen');

  // collect detaials for query/mutation
  const { id: userId } = _getUserDetails();
  const { id: mealId } = useParams<{ id: string }>();

  // relevant query and mutation
  const { data, loading, error } = useQuery(GET_MEAL_QUERY, {
    variables: { userId, mealId },
  });

  const [deleteMeal, { loading: mutationLoading, error: mutationError }] =
    useMutation(DELETE_MEAL);

  // open state for delete confirmation dialog
  const [open, setOpen] = useState<boolean>(false);

  // loading or error early return
  if (loading || mutationLoading) {
    return <Loading />;
  }

  if (error || mutationError) {
    const msg = error
      ? 'Error retrieving meal'
      : mutationError
      ? 'Error deleting meal, please try again'
      : undefined;
    return <ErrorPage message={msg} />;
  }

  const confirmMealDelete = async () => {
    await deleteMeal({ variables: { userId, mealId } });
    navigate(-1);
  };

  // extract data if not loading/no error
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
            theme={{ colors: { onSurfaceDisabled: colors.onPrimaryContainer } }}
            disabled={true}
            value={meal.description}
            multiline={true}
            numberOfLines={20}
          />

          {/* Delete Button */}
          <IconButton
            mode="contained"
            size={50}
            icon="delete"
            style={{
              position: 'absolute',
              bottom: 10,
              alignSelf: 'center',
            }}
            onPress={() => setOpen(true)}
          />

          {/* Confirm delete dialog */}
          <DeleteMealDialog
            open={open}
            setOpen={setOpen}
            confirmMealDelete={confirmMealDelete}
          />
        </>
      )}
    </ScrollView>
  );
};
