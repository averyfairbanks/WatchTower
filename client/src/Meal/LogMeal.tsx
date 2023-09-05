import { VStack } from '@react-native-material/core';
import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import styled from 'styled-components/native';
import { useSnackBar } from '../common/SnackBar/hook';
import { SnackType } from '../common/SnackBar/types';
import { _getUserDetails } from '../utils/storeMethods';

const StyledText = styled(Text).attrs({ variant: 'titleLarge' })``;
const StyledTextInput = styled(TextInput).attrs({
  mode: 'outlined',
  multiline: true,
  numberOfLines: 15,
  maxLength: 512,
})``;

interface CreateMealDto {
  userId: string;
  name: string;
  description: string;
  photoUrl: string;
}

export const LogMeal: React.FC = () => {
  const { addSnack } = useSnackBar();
  const navigate = useNavigate();

  const { id: userId } = _getUserDetails();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [createDto, setCreateDto] = useState<CreateMealDto>({
    name: '',
    description: '',
    userId,
    photoUrl: 'https://picsum.photos/900',
  });

  const pickFile = useCallback(async () => {
    setIsLoading(true);
    DocumentPicker.pick({
      type: [DocumentPicker.types.images],
    })
      .then(res => {
        console.log(res.toString());
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        addSnack('Error uploading file', SnackType.FAILURE);
      });
  }, []);

  const handleLogMeal = () => {
    setIsLoading(true);
    fetch(`http://localhost:3000/meal/create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(createDto),
    })
      .then(async res => {
        if (res.ok) {
          return res.json();
        }

        const body = await res.json();
        throw new Error(`${body.statusCode}, ${body.statusText}`);
      })
      .then(json => {
        console.log(json);
        setIsLoading(false);
        navigate(-1);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        addSnack('Error logging new meal!', SnackType.FAILURE);
      });
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <VStack fill spacing={20} m={7} mt={20}>
        <View>
          <StyledText>Name</StyledText>
          <TextInput
            mode="outlined"
            value={createDto?.name}
            onChange={e =>
              setCreateDto({
                ...createDto,
                name: e.nativeEvent.text,
              })
            }
            maxLength={128}
          />
        </View>
        <View>
          <StyledText>Description</StyledText>
          <StyledTextInput
            value={createDto?.description}
            onChange={e =>
              setCreateDto({
                ...createDto,
                description: e.nativeEvent.text,
              })
            }
          />
        </View>
        <Button
          mode="elevated"
          icon="camera"
          onPress={pickFile}
          disabled={isLoading}>
          Upload Photo
        </Button>
        <Button
          mode="elevated"
          onPress={handleLogMeal}
          disabled={isLoading}
          style={{
            position: 'absolute',
            start: 16,
            end: 16,
            bottom: 0,
          }}>
          Submit
        </Button>
      </VStack>
    </ScrollView>
  );
};
