import { Box, VStack } from '@react-native-material/core';
import { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import { Avatar, Surface, Text, TextInput, useTheme } from 'react-native-paper';
import { useParams } from 'react-router-native';
import { useSnackBar } from '../common/SnackBar/hook';
import { SnackType } from '../common/SnackBar/types';
import { _getUserDetails } from '../utils/storeMethods';
import { UserMeal } from './types';

const TEMP: React.FC = () => {
  const theme = useTheme();
  const { height, width } = Dimensions.get('screen');

  return Object.entries(theme.colors).map(([key, val]) => (
    <View key={key.toString()}>
      <Text>{key.toString()}</Text>
      <Box
        style={{
          width,
          height: 200,
          backgroundColor: val.toString(),
        }}></Box>
    </View>
  ));
};

export const Meal: React.FC = () => {
  const { id: mealId } = useParams<{ id: string }>();
  const { id: userId } = _getUserDetails();

  const theme = useTheme();

  const { addSnack } = useSnackBar();

  const [meal, setMeal] = useState<UserMeal | null>(null);
  const { height, width } = Dimensions.get('screen');

  useEffect(() => {
    fetch(`http://localhost:3000/meal/${userId}/${mealId}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
      .then(async res => {
        if (res.ok) {
          return res.json();
        }

        const err = await res.json();
        throw new Error(`${err.statusCode}, ${err.statusText}`);
      })
      .then(val => {
        setMeal(val);
      })
      .catch(err => {
        console.error(err);
        addSnack('Error retrieving meal', SnackType.FAILURE);
      });
  }, []);

  return (
    <VStack fill>
      <ScrollView>
        {meal && (
          <>
            <Surface
              style={{
                backgroundColor: theme.colors.inversePrimary,
                margin: 0,
                width: width,
              }}>
              <Avatar.Icon
                icon="food"
                style={{
                  position: 'absolute',
                  top: 15,
                  left: 15,
                  zIndex: 1000,
                }}
              />
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
                  Logged At:{'\t'}
                  <Text>{new Date(meal.timeLogged).toLocaleString()}</Text>
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
          </>
        )}
        <TEMP />
      </ScrollView>
    </VStack>
  );
};
