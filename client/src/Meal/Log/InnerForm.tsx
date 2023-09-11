import { useMutation } from '@apollo/client';
import { VStack } from '@react-native-material/core';
import { useFormikContext } from 'formik';
import { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import { ErrorPage } from '../../common/Error/Error';
import { Loading } from '../../common/Loading/Loading';
import { useSnackBar } from '../../common/SnackBar/hook';
import { LOG_MEAL_MUTATION } from './gql/LogNewMealMutation';
import { StyledSubmit, StyledText, StyledTextInput } from './styled';
import { LogMealFormValues } from './types';
import { _pickImage, handleLogMeal } from './utils';

interface InnerFormProps {}

export const InnerForm: React.FC<InnerFormProps> = () => {
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logMeal, { loading, error }] = useMutation(LOG_MEAL_MUTATION);

  // context values/actions
  const navigate = useNavigate();
  const { addSnack } = useSnackBar();
  const { values, isValid, isSubmitting, handleChange, setFieldValue } =
    useFormikContext();

  const { name, description, image } = values as LogMealFormValues;

  const pickImage = useCallback(async () => {
    _pickImage(setIsLoading, setFieldValue, addSnack);
  }, []);

  if (isLoading || loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage />;
  }

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <VStack fill spacing={20} m={7} mt={20}>
        <View>
          <StyledText>Name</StyledText>
          <TextInput
            mode="outlined"
            value={name}
            onChangeText={handleChange('name')}
            maxLength={64}
          />
        </View>
        <View>
          <StyledText>Description</StyledText>
          <StyledTextInput
            value={description}
            onChangeText={handleChange('description')}
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
        <StyledSubmit
          onPress={() =>
            handleLogMeal(
              logMeal,
              setIsLoading,
              values as LogMealFormValues,
              navigate,
              addSnack,
            )
          }
          disabled={!isLoading && !isValid && !isSubmitting}>
          Submit
        </StyledSubmit>
      </VStack>
    </ScrollView>
  );
};
