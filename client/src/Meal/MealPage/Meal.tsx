import { useMutation, useQuery } from '@apollo/client';
import { Selector, VStack } from '@react-native-material/core';
import { useState } from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import {
  Divider,
  Surface,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { useNavigate, useParams } from 'react-router-native';
import styled from 'styled-components';
import { ErrorPage } from '../../common/Error/Error';
import { Loading } from '../../common/Loading/Loading';
import { _getUserDetails } from '../../utils/storeMethods';
import { DeleteMealDialog } from './DeleteMealDialog';
import { DELETE_MEAL } from './gql/DeleteMealMutation';
import { GET_MEAL_QUERY } from './gql/GetMealQuery';
import { StyledDeleteIcon, StyledFoodIcon } from './styled';

export const Meal: React.FC = () => {
  // for styling text input
  const { colors } = useTheme();

  const StyledTextInput = styled(TextInput).attrs({
    mode: 'flat',
    theme: { colors: { onSurfaceDisabled: colors.onPrimaryContainer } },
    disabled: true,
    multiline: true,
    numberOfLines: 15,
  })``;

  // to exit page
  const navigate = useNavigate();

  // For setting image height/width
  const { height, width } = Dimensions.get('screen');

  const StyledSurface = styled(Surface).attrs({ style: { width } })``;

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
          <StyledSurface>
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
              <Text variant="titleSmall">
                <Text>Logged On: {date}</Text>
                <Text>
                  {'\n'}At: {time}
                </Text>
              </Text>
              <Divider bold style={{ marginTop: 20 }} />
              <Text variant="titleLarge">Description</Text>
            </VStack>
            <StyledTextInput value={meal.description} />
          </StyledSurface>

          {/* Delete Button */}
          <StyledDeleteIcon icon="delete" onPress={() => setOpen(true)} />

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
