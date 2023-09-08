import { VStack } from '@react-native-material/core';
import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { Button, Text, TextInput } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import styled from 'styled-components/native';
import { useSnackBar } from '../common/SnackBar/hook';
import { _getUserDetails } from '../utils/storeMethods';
import { CreateMealDto } from './types';
import { _pickImage, handleLogMeal } from './utils';

const StyledText = styled(Text).attrs({ variant: 'titleLarge' })``;
const StyledTextInput = styled(TextInput).attrs({
  mode: 'outlined',
  multiline: true,
  numberOfLines: 15,
  maxLength: 512,
})``;

export const LogMeal: React.FC = () => {
  // context/utility hooks
  const navigate = useNavigate();
  const { addSnack } = useSnackBar();
  const { id: userId } = _getUserDetails();

  // loading status, classic
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // update dto sans the photourl, for async state update reasons
  const [createDto, setCreateDto] = useState<Omit<CreateMealDto, 'photoUrl'>>({
    name: '',
    description: '',
    userId,
  });

  // image state and callback w/ select logic
  const [image, setImage] = useState<Asset>();
  const pickImage = useCallback(async () => {
    _pickImage(setIsLoading, setImage, addSnack);
  }, []);

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
          onPress={pickImage}
          disabled={isLoading}>
          Upload Photo
        </Button>
        {image && <Text style={{ alignSelf: 'center' }}>{image.fileName}</Text>}
        <Button
          mode="elevated"
          onPress={() =>
            handleLogMeal(
              setIsLoading,
              image,
              userId,
              createDto,
              navigate,
              addSnack,
            )
          }
          disabled={
            isLoading || !(createDto.name && createDto.description && image)
          }
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
