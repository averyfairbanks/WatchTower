import { useMutation, useQuery } from '@apollo/client';
import { VStack } from '@react-native-material/core';
import { useState } from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import {
  Button,
  Dialog,
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
import { DELETE_MEAL } from './gql/DeleteMealMutation';
import { GET_MEAL_QUERY } from './gql/GetMealQuery';
import { StyledFoodIcon } from './styled';

export const Meal: React.FC = () => {
  const { colors } = useTheme();

  const navigate = useNavigate();

  const { height, width } = Dimensions.get('screen');

  const { id: userId } = _getUserDetails();
  const { id: mealId } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery(GET_MEAL_QUERY, {
    variables: { userId, mealId },
  });

  const [deleteMeal, { loading: mutationLoading }] = useMutation(DELETE_MEAL);

  const [open, setOpen] = useState<boolean>(false);

  if (loading || mutationLoading) {
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
            theme={{ colors: { onSurfaceDisabled: colors.onPrimaryContainer } }}
            disabled={true}
            value={meal.description}
            multiline={true}
            numberOfLines={20}
          />
          <Dialog
            visible={open}
            dismissable={true}
            onDismiss={() => setOpen(false)}
            style={{ alignItems: 'center' }}>
            <Dialog.Icon icon="delete" />
            <Dialog.Title>Delete Meal</Dialog.Title>
            <Dialog.Content>
              <Text>Are you sure you want to delete this meal?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={async () => {
                  await deleteMeal({ variables: { userId, mealId } });
                  navigate(-1);
                }}>
                Yes
              </Button>
              <Button onPress={() => setOpen(false)}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>

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
        </>
      )}
    </ScrollView>
  );
};
