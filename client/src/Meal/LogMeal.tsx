import { VStack } from '@react-native-material/core';
import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
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
  const [createDto, setCreateDto] = useState<Omit<CreateMealDto, 'photoUrl'>>({
    name: '',
    description: '',
    userId,
  });

  const b64toBlob = (base64: string, type = 'application/octet-stream') =>
    fetch(`data:${type};base64,${base64}`).then(res => res.blob());

  const [image, setImage] = useState<Asset>();
  const pickFile = useCallback(async () => {
    setIsLoading(true);
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.6,
      selectionLimit: 1,
    })
      .then(file => {
        if (!file.didCancel && file && file.assets && file.assets[0]) {
          setImage(file.assets[0]);
          setIsLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        addSnack('Error collecting your file!', SnackType.FAILURE);
      });
  }, []);

  const handleLogMeal = async () => {
    setIsLoading(true);
    try {
      if (image?.uri && image?.type) {
        const { uri, type } = image;
        const blob = await fetch(uri).then(res => {
          return res.blob();
        });

        if (blob) {
          const filename = `${Date.now()}_meal.${type?.replace('image/', '')}`;

          const signedUrl = await fetch(
            `http://localhost:3000/photo-upload/create`,
            {
              method: 'POST',
              headers: {
                Accept: '*/*',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId,
                type,
                filename,
              }),
            },
          ).then(res => res.text());

          const putImage = await fetch(signedUrl.toString(), {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': `${type}; charset=ascii`,
            },
            body: blob,
          }).then(res => {
            if (!res.ok) {
              console.log(res.status);
              throw new Error('Error uploading file');
            }
          });

          await fetch(`http://localhost:3000/meal/create`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
              ...createDto,
              photoUrl: `${userId}/meals/${filename}`,
            }),
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
            });
        }
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      addSnack('Error logging new meal!', SnackType.FAILURE);
    }
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
            maxLength={64}
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
        {image && <Text>{image.fileName}</Text>}
        <Button
          mode="elevated"
          onPress={handleLogMeal}
          disabled={isLoading || !(createDto.name && createDto.description && image)}
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
