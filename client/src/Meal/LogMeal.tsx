import { VStack } from '@react-native-material/core';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import styled from 'styled-components/native';
import DocumentPicker from 'react-native-document-picker';
import { useCallback } from 'react';
import { useSnackBar } from '../common/SnackBar/hook';
import { SnackType } from '../common/SnackBar/types';

const StyledText = styled(Text).attrs({ variant: 'titleLarge' })``;
const StyledTextInput = styled(TextInput).attrs({
    mode: 'outlined',
    multiline: true,
    numberOfLines: 15,
})``;

export const LogMeal: React.FC = () => {
    const { addSnack } = useSnackBar();

    const pickFile = useCallback(async () => {
        DocumentPicker.pick({
            type: [DocumentPicker.types.images],
        })
            .then(res => console.log(res.toString()))
            .catch(err => {
                console.log(err);
                addSnack('Error uploading file', SnackType.FAILURE);
            });
    }, []);

    return (
        <ScrollView>
            <VStack fill spacing={20} m={7} mt={20}>
                <View>
                    <StyledText>Name</StyledText>
                    <TextInput mode="outlined" />
                </View>
                <View>
                    <StyledText>Description</StyledText>
                    <StyledTextInput />
                </View>
                <Button mode="elevated" icon="camera" onPress={pickFile}>
                    Upload Photo
                </Button>
            </VStack>
        </ScrollView>
    );
};
